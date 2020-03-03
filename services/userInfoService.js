/**
 * 功能描述：
 * 2020/03/03
 * 作者：win
 */
const UserInfo = require('../models/userInfo')
const Sequelize = require('sequelize');
const uuID = require("node-uuid")
const Op = Sequelize.Op
exports.getAllUserInfoBySeq = (req, res, next) => {
  let params = req.query.searchKey || ''
  let current = parseInt(req.query.current) || 1
  let size = parseInt(req.query.size) || 10
  UserInfo.findAll(
    {
      offset: (current - 1) * size,
      limit: size,
      order: [[Sequelize.col('userAge'), 'DESC']],
      //attributes: ['userName'],//指定字段
      where: {[Op.or]: [{userName: {[Op.like]: '%' + params + '%'}}, {userAge: {[Op.like]: '%' + params + '%'}}]}
    }
  ).then((response) => {
    res.json({
      status: '200',
      msg: '查询成功',
      result: response
    })
  })
}

exports.addUserBySeq = (req, res, next) => {
  let data = req.body
  UserInfo.create({userId: uuID.v1(), ...data}).then((response) => {
    if (response) {
      res.json({
        status: '200',
        msg: '插入新数据成功',
        result: null
      })
    }
  })
}

exports.updateUserBySeq = (req, res, next) => {
  let data = req.body
  if (data && data.userId) {
    UserInfo.update({...data}, {where: {userId: data.userId}}).then((response) => {
      if (response) {
        res.json({
          status: '200',
          msg: '修改数据成功',
          result: null
        })
      }
    })
  } else {
    res.json({
      status: '400',
      msg: '缺少userId！',
      result: null
    })
  }
}

exports.deleteUserBySeq = (req, res, next) => {
  let data = req.query
  if (data && data.userId) {
    UserInfo.destroy({where: {userId: data.userId}}).then((response) => {
      if (response) {
        res.json({
          status: '200',
          msg: '删除数据成功',
          result: null
        })
      }
    })
  } else {
    res.json({
      status: '400',
      msg: '缺少userId！',
      result: null
    })
  }
}
