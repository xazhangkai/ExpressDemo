const mysql = require("mysql")

exports.dbBase = (sql, data, callBack) => {
  const connection = mysql.createConnection({
    host: '172.20.36.145',
    user: 'test',
    password: '123456',
    database: 'devExpress',
    port: 3306
  })
  connection.connect()
  connection.query(sql, data, function (error, results, fields) {
    if (error) throw error;
    callBack(results);
    console.log("数据库连接成功")
  })
  connection.end();
}
