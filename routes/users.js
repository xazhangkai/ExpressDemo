var express = require('express');
var router = express.Router();
const service = require('../services/userService')
//获取用户列表
router.get('/getUserList', service.getUserList)
router.post('/addUser', service.addUser)
router.post('/updateUser', service.updateUser)
router.get('/deleteUser', service.deleteUser)

module.exports = router;
