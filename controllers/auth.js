const jwt = require("jsonwebtoken")
const {find_element}  = require("../helpers/findElement");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const bcrypt = require("bcrypt");


const verify_refresh_token = async (req, res,next) => {
    const {email,refreshToken} = req.body;
    let findUser = await find_element({email},User);
    if(!findUser) return next(new HttpError("can't find user while logging in","Can't find the user",404));
    if(findUser.refreshToken!==refreshToken)
        return next(new HttpError("refreshToken doesn't match","refresh token doesn't match",400));
   
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ email: findUser.email })
        res.json({status:"ok",data:{ accessToken: accessToken }})
    })
}

const logout = async  (req, res,next) => {
    const {email,refreshToken} = req.body;
    let findUser = await find_element({email},User);
    if(!findUser) return next(new HttpError("can't find user while logging in","Can't find the user",404));
    if(findUser.refreshToken!==refreshToken)
        return next(new HttpError("refreshToken doesn't match","refresh token doesn't match",400));
    
    findUser.refreshToken = "";
    try{
        await findUser.save();
    }catch(err){
        return next(new HttpError(err,"can't save the refreshToken while log out",500))
    }
    res.sendStatus(204)
}

const login = async (req, res) => {
    // Authenticate User

    const {email,password} = req.body;
    let findUser = await find_element({email},User);
    if(!findUser) return next(new HttpError("can't find user while logging in","Can't find the user",404));

    let passwordMatched = false;
    try{
        passwordMatched = await bcrypt.compare(password,findUser.password);
    }catch(err){
        return next(new HttpError(err,"error while comparing passwords",500))
    }

    if(!passwordMatched)
        res.sendStatus(403);

    const user = { email }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    findUser.refreshToken = refreshToken;
    try{
        await findUser.save()
    }catch(err){
        return next(new HttpError(err,"can't save the refreshToken",500))
    }
    res.json({status:"ok",data:{ accessToken: accessToken, refreshToken: refreshToken,email,tags:findUser.tags,profession:findUser.profession }})
}

const generateAccessToken = (user)=> {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '50min' })
}

const SIGNUP = async (req,res,next)=>{
    
    const {
        email,
        password,
        tags,
        profession
    } = req.body;

    let findUser = await find_element({email},User);
    if(findUser) return next(new HttpError(err,"User already exists",402));
    
    let hashedPassword ;
    try{
        hashedPassword = await bcrypt.hash(password,+process.env.SALT)
    }catch(err){
        return next(new HttpError(err,"While hashing the password",500))
    }
    const accessToken = generateAccessToken({email})
    const refreshToken = jwt.sign({email}, process.env.REFRESH_TOKEN_SECRET)
    let newUser = new User({
        email,
        tags,
        profession,
        password:hashedPassword,
        refreshToken
    })
    
    try{
        await newUser.save()
    }catch(err){
        return next(new HttpError(err,"while saving the user",500))
    }

    res.status(200).json({status:"ok",data:{email,tags,profession,accessToken,refreshToken}})


    
}
module.exports = {login,logout,generateAccessToken,verify_refresh_token,SIGNUP}