/**
 * 功能描述：
 * 2020/03/03
 * 作者：win
 */
const sequelize = require('../config/sequelizeConfig')
const Sequelize = require('sequelize');
const UserInfo = sequelize.define('userInfo',
  {
    userId: {
      type: Sequelize.UUIDV1,//字段类型
      field: 'userId',//数据库中字段名
      primaryKey: true,//是否为主键
      allowNull: false,
    },
    userName: {
      type: Sequelize.STRING,//字段类型
      field: 'userName',//数据库中字段名
    },
    userAge: {
      type: Sequelize.STRING,//字段类型
      field: 'userAge'//数据库中字段名
    },
    userAddress: {
      type: Sequelize.STRING,//字段类型
      field: 'userAddress'//数据库中字段名
    },
    userDesc: {
      type: Sequelize.STRING,//字段类型
      field: 'userDesc'//数据库中字段名
    }
  },
  {
    timestamps: false,//禁止生成createdAt,updatedAt字段
    freezeTableName: true//Model对应的表名将与model名相同
  }
)

module.exports = UserInfo
