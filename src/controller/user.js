const dbRepo = require('../../models');
// const User = dbRepo['default'].User;
const common = require("../middleware/common")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require("../../config/secret")

const createUserAccount = async(req,res)=>{
    try{
        let dbKey = await common.getDBKeyFromRequest(req);
        const User = dbRepo[dbKey].User;
        console.log(User);

        console.log("//////dbKey/////",dbKey);
        if(dbKey == "default"){
            return res.status(400).json({status:false,message:"your organization not registered..!"})
        }
        console.log(req.body);
        const {firstName,lastName,email,password} = req.body
        if(!firstName || !lastName || !email || !password)
        {
            return res.status(400).json({status:false,message:"please add all fields..!"})
        }

        const hashpassword = bcrypt.hashSync(password,10)
        let users = await User.create({
            firstName,
            lastName,
            email,
            password:hashpassword
        })

        if(!users)
        
           return res.status(400).json({status:false,message:"something went wrong..!"})

           return res.status(200).json({status:false,message:"succesfully add", data:users})
      
    }catch(err){
        console.log(err);
    }
}


const getUser = async(req,res)=>{
    try{
        let dbKey = await common.getDBKeyFromRequest(req);
        const User = dbRepo[dbKey].User;
        console.log(User);

        console.log("//////dbKey/////",dbKey);
       
        let users = await User.findAndCountAll({})

        if(!users)
        
           return res.status(400).json({status:false,message:"something went wrong..!"})

           return res.status(200).json({status:false,message:"succesfully fetched", data:users})
      
    }catch(err){
        console.log(err);
    }
}

const login = async(req,res)=>{
    try{
        let dbKey = await common.getDBKeyFromRequest(req);
        const User = dbRepo[dbKey].User;
        console.log(User);

        console.log("//////dbKey/////",dbKey);
        console.log(req.body);
        const {email,password} = req.body
        if(!email || !password)
        {
            return res.status(400).json({status:false,message:"please add all fields..!"})
        }
        
        let users = await User.findOne({
            where:{email:email}
        })

        if(!users)
           return res.status(400).json({status:false,message:"register first..!"})

        let comparepass = bcrypt.compareSync(password, users.password)

        if(!comparepass)
        
           return res.status(400).json({status:false,message:"invalid username or password..!"})

         let token =  jwt.sign({id:users.id,tenant_id:dbKey},SECRET_KEY)
           
           return res.status(200).json({status:false,message:"succesfully login done", data:users,token:token})
      
    }catch(err){
        console.log(err);
    }
}

const getDAta =async (req,res)=>{
    res.json("welcome")
}

module.exports = {
    createUserAccount,
    getUser,
    login,
    getDAta
}