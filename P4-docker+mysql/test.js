const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
});

connection.connect();

connection.query(
  "CREATE DATABASE IF NOT EXISTS dt2 DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_520_ci;",
  function (error, results, fields) {
    if (error) throw error;
    console.log("dt2数据库 创建成功- results:", results);
  }
);

connection.query("USE dt2;");

// connection.query(
//   `CREATE TABLE IF NOT EXISTS user(
//     name text,
//     age int
//   )`,
//   function (error, results, fields) {
//     if (error) throw error;
//     console.log("dt1-user表 创建成功- results:", results);
//   }
// );

connection.end();
