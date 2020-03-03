/**
 * 功能描述：
 * 2020/03/03
 * 作者：win
 */
const Sequelize = require('sequelize')

const sequelize = new Sequelize('devExpress', 'test', '123456', {
  host: '172.20.36.145',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 5000,
    idle: 10000
  }
})

sequelize.authenticate()
  .then(() => {
    console.log("数据库连接已建立")
  })
  .catch((error) => {
    console.log(error)
  })

module.exports = sequelize


