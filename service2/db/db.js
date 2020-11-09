//db.js
// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'master_express',
  port: 3306,
  charset:'UTF8_GENERAL_CI'
});



function query(sql, callback) {
  pool.getConnection(function (err, connection) {
    // Use the connection
    connection.query(sql, function (err, rows) {
      callback(err, rows);
      connection.release();//释放链接
    });
  });
};

function base(sql,data,callback){
  pool.getConnection(function (err, connection) {
    // Use the connection
    pool.connect();
    pool.query(sql,data, function (error, results, fields) {
      if (error) throw error;
      callback && callback(results)
    })
    pool.end();
  });


}



exports.base = base;

exports.query = query;
