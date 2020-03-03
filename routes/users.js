var express = require('express');
var router = express.Router();

const service = require('../services/userService')
const userInfoService = require('../services/userInfoService')
const multer = require('multer') //multer无法识别设置的Context-type会报错，会自动识别并添加
const storage = multer.diskStorage({
  destination: './public/images/userImg/', //若为函数则不创建不存在文件目录
  filename: function (req, file, cb) {
    const userId = req.body.id
    cb(null, userId + new Date().getTime() + '.' + file.originalname.split('.')[1])
  }
})
const uploadMulter = multer({storage: storage})
//获取用户列表
router.get('/getUserList', service.getUserList)
router.post('/addUser', service.addUser)
router.post('/updateUser', service.updateUser)
router.get('/deleteUser', service.deleteUser)
router.post('/uploadUserImg', uploadMulter.array('file'), service.uploadUserImg)

router.get('/getAllUserInfoBySeq', userInfoService.getAllUserInfoBySeq)
router.post('/addUserBySeq', userInfoService.addUserBySeq)
router.post('/updateUserBySeq', userInfoService.updateUserBySeq)
router.delete('/deleteUserBySeq', userInfoService.deleteUserBySeq)
module.exports = router;
