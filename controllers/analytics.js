const Analytics = require("../models/analytics");
const httpError = require("../models/http-error");
const {find_element} = require("../helpers/findElement");
const User = require("../models/user");


exports.store_click = async (req, res, next) => {
  
  let user = req.user;
  let requestUser = false;
  try {
    requestUser = await find_element({ email: user.email }, User);
  } catch (err) {
    return next(new httpError(err, "error while looking for user", 500));
  }
  if (!requestUser)
    return next(
      new httpError(
        "User doesn't exists but passed auth middleware",
        "How the fuck you reached here",
        403
      )
    );
    let analyticsObj = await find_element({_id:requestUser.analytics._id},Analytics);
    if(!analyticsObj) return next(new httpError("somehow can't find analytics while adding click stream","somehow can't find analytics while adding click stream",500))
    analyticsObj.clicked.push(...req.body.clicks);
    try{
        await analyticsObj.save()
    }catch(err){
        return next(new httpError(err,"Can't save the clicks",500))
    }
    res.sendStatus(200)
};

exports.store_view = async (req, res, next) => {
    let user = req.user;
  let requestUser = false;
  try {
    requestUser = await find_element({ email: user.email }, User);
  } catch (err) {
    return next(new httpError(err, "error while looking for user", 500));
  }
  if (!requestUser)
    return next(
      new httpError(
        "User doesn't exists but passed auth middleware",
        "How the fuck you reached here",
        403
      )
    );
    let analyticsObj = await find_element({_id:requestUser.analytics._id},Analytics);
    if(!analyticsObj) return next(new httpError("somehow can't find analytics while adding click stream","somehow can't find analytics while adding click stream",500))
    analyticsObj.viewed.push(...req.body.views);
    try{
        await analyticsObj.save()
    }catch(err){
        return next(new httpError(err,"Can't save the views",500))
    }
    res.sendStatus(200)
};

exports.store_session = async (req, res, next) => {
    let user = req.user;
  let requestUser = false;
  try {
    requestUser = await find_element({ email: user.email }, User);
  } catch (err) {
    return next(new httpError(err, "error while looking for user", 500));
  }
  if (!requestUser)
    return next(
      new httpError(
        "User doesn't exists but passed auth middleware",
        "How the fuck you reached here",
        403
      )
    );
    let analyticsObj = await find_element({_id:requestUser.analytics._id},Analytics);
    if(!analyticsObj) return next(new httpError("somehow can't find analytics while adding click stream","somehow can't find analytics while adding click stream",500))
    analyticsObj.sessions.push(...req.body.session);
    try{
        await analyticsObj.save()
    }catch(err){
        return next(new httpError(err,"Can't save the sessions",500))
    }
    res.sendStatus(200)
};


exports.get_analysis = async (req,res,next)=>{
  let {type} = req.query;
  let user = req.user;
  let requestUser = false;
  try {
    requestUser = await find_element({ email: user.email }, User);
  } catch (err) {
    return next(new httpError(err, "error while looking for user", 500));
  }
  if (!requestUser)
    return next(
      new httpError(
        "User doesn't exists but passed auth middleware",
        "How the fuck you reached here",
        403
      )
    );
    let analyticsObj = await find_element({_id:requestUser.analytics._id},Analytics);
    if(!analyticsObj) return next(new httpError("somehow can't find analytics while adding click stream","somehow can't find analytics while adding click stream",500))
    if(!["clicked","viewed","sessions","all"].includes(type)) return next(new httpError("type value provided isn't correct.","type value provided isn't correct.",400));
    if(type==="all")
    {
      res.status(201).json({data:analyticsObj});
      return;
    }
    res.status(201).json({data:analyticsObj[type]})
}