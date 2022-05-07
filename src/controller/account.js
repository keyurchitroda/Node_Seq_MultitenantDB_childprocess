const dbRepo = require('../../models');
const Account = dbRepo['default'].Account;
const signupDataProvider = require('../tenantDB/tenantProvider');
const bcrypt = require('bcryptjs')

    console.log(Account);
const createAccount = async(req,res)=>{
    try{
        console.log(req.body);
        const {name,domain,owner} = req.body
        if(!name || !domain || !owner)
        {
            return res.status(400).json({status:false,message:"please add all fields..!"})
        }
        let account = await Account.create(req.body)

        if(!account)
        
           return res.status(400).json({status:false,message:"something went wrong..!"})

            let tenantDB =  await signupDataProvider.createTenantDB(account.id)

           let hash_tenant = bcrypt.hashSync(tenantDB,12)
        console.log(hash_tenant);
            if(tenantDB)
            {
            await Account.update({tenantId:tenantDB},{
                where:{
                      id:account.id,
                  },
                  returning: true,
                plain: true
              })
            }
           return res.status(200).json({status:false,message:"succesfully add", data:account,tenant:tenantDB})
      
    }catch(err){
        console.log(err);
    }

}

const getAccount = async(req,res)=>{
    try{
        

     let account =  await Account.findAll({})
        if(!account)
          return res.status(400).json({status:false,message:"something went wrong..!"})

           return res.status(200).json({status:false,message:"succesfully add", data:account})
      
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    createAccount,
    getAccount
}