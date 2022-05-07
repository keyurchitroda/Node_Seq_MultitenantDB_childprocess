const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../../config/secret')

module.exports = async(req,res,next)=>{
    try{
        let {authorization} = req.headers
        if(!authorization)
         return res.status(400).json({status:false,message:"unAUthorized"})
           jwt.verify(authorization,SECRET_KEY,(err,payload)=>{
               if(err)
               return res.status(400).json({status:false,message:"Somethin Went Wrong"})
            console.log("//////==-======",payload);
           }) 
           next()
        }catch(err){
        console.log(err);
    }
}