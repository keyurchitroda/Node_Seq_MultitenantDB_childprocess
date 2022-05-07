const dbRepo = require('../../models');
const dbConnector = require('../utils/dbconnector');
const Account = dbRepo["default"].Account
const bcrypt = require('bcryptjs')

let Common = {

  getDBKeyFromRequest: async (request) => {
    let tenant_id = request.headers['x-tenant-id'];
    console.log("/////tenant-id/////",tenant_id);
    let dbKey = 'default';
    if(tenant_id) {
      dbKey = tenant_id;
    }
    console.log("///DHKEY///",dbKey);
    if(!dbRepo[dbKey]) {
      let account = await Account.findOne({where:{tenantId:tenant_id}})
      // compareTenant = bcrypt.compareSync()
      console.log("middleware,,,,,,,!",account);
      if(account) {
        dbConnector.addSequelizeConnectionToRepo(dbRepo, dbKey);
      } else {
        dbKey = 'default';
      }
    }
    return dbKey;
  }
};

module.exports = Common;
