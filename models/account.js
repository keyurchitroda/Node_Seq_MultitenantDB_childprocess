'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    tenantId: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {});
  
  return Account;
  
};
