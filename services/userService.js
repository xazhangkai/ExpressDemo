const db = require("../config/dbConfig")
const uuID = require("node-uuid")

exports.getUserList = (req, res, next) => {
  let userName = req.query.userName
  let sql = 'select * from userInfo where 1=1'
  if (userName) {
    sql += ' and userName = ?'
  }
  let data = [userName];
  db.dbBase(sql, data, (response) => {
    if (response.length == 0) {
      res.json({
        status: '200',
        msg: '暂无结果',
        result: []
      })
    } else {
      res.json({
        status: '200',
        msg: '查询成功',
        result: response
      })
    }
  })
}

exports.addUser = (req, res, next) => {
  let data = req.body
  let sql = 'insert into userInfo (userId, userName, userAge, userAddress, userDesc) values (?,?,?,?,?)';
  db.dbBase(sql, [uuID.v1(), data.userName, data.userAge, data.userAddress, data.userDesc], (response) => {
    res.json({
      status: '200',
      msg: '新增成功！',
      result: null
    })
  })
}

exports.updateUser = (req, res, next) => {
  let data = req.body
  if (data.userId) {
    let sql = 'update userInfo set userName = ?, userAge = ?, userAddress = ?, userDesc = ? where userId = ?';
    db.dbBase(sql, [data.userName, data.userAge, data.userAddress, data.userDesc, data.userId], (response) => {
      res.json({
        status: '200',
        msg: '更新成功！',
        result: null
      })
    })
  } else {
    res.json({
      status: '400',
      msg: '缺少userId！',
      result: null
    })
  }

}

exports.deleteUser = (req, res, next) => {
  const userId = req.query.userId;
  let sql = "delete from userInfo where userId=?"
  if (userId) {
    db.dbBase(sql, [userId], (response) => {
      res.json({
        status: '200',
        msg: '删除成功！',
        result: null
      })
    })
  } else {
    res.json({
      status: '400',
      msg: '缺少userId！',
      result: null
    })
  }

}

exports.uploadUserImg = (req, res, next) => {
  console.log(req.body, req.files, req.file)
  if (req.file || req.files) {
    res.json({
      file: req.file || req.files
    })
  }

}
