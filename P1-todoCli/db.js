const homeDir = require("os").homedir();
const path = require("path");
const fs = require("fs");

// 获取到用户的主目录，优先取 用户可能自定义的 HOME环境变量 || os.homedir()
const home = process.env.HOME || homeDir;
// 拼接出 todoList的 数据库文件的路径
const dbPath = path.join(home, ".todo");

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: "a+" }, (err, data) => {
        if (err) return reject(err);
        let list = [];
        try {
          // 只有当data不为空时才尝试解析
          const content = data.toString();
          if (content) {
            list = JSON.parse(content);
          }
        } catch (err2) {
          list = [];
          console.log("解析失败，使用空列表", err2);
        }
        resolve(list);
      });
    });
  },

  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const content = JSON.stringify(list) + '\n';
      fs.writeFile(path, content, (err) => {
        if (err) return reject(err);
        resolve();
      });
    }); 
  },
};

module.exports = db;