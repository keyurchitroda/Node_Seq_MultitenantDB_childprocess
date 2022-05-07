const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
const migrationPath = path.resolve(__dirname + '/../../migrations');

const dbRepo = require('../../models');
const Account = dbRepo['default'].Account;

const cli = require('../utils/cli');
const dbConnector = require('../utils/dbconnector');

var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let tenant_string = Array(16).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');

let SignupDataProvider = {

  createTenantDB: async(accountId) => {
    let connectionString = `${config.dialect}://${config.username}:${config.password}@${config.host}/sarvadhi_${tenant_string}`;
    console.log(`Create Database for Tenant[Name: sarvadhi_${tenant_string}]`);
    await cli.executeCommand(`npx sequelize db:create --url ${connectionString}`);

    console.log(`Run Migrations on Tenant Database[Name: sarvadhi_${tenant_string}]`);
    await cli.executeCommand(`npx sequelize db:migrate --url ${connectionString} --migrations-path=${migrationPath}`);
  
    dbConnector.addSequelizeConnectionToRepo(dbRepo, `sarvadhi_${tenant_string}`);
    return `sarvadhi_${tenant_string}`
  },

  
};

module.exports = SignupDataProvider;
