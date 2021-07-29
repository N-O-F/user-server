const professions = require("../Assets/professions2");


exports.get_professions = async (req,res,next)=>{
    
    if(professions){
        res.status(200).json({status:"ok",data:professions})
    }else
    res.sendStatus(500)
}