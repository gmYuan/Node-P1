const homeDir = require("os").homedir();
// 获取到用户的主目录，优先取 用户可能自定义的 HOME环境变量 || os.homedir()
const home = process.env.HOME || homeDir;
const path = require("path");
const fs = require("fs");

// 拼接出 todoList的 数据库文件的路径
const dbPath = path.join(home, ".todo");

module.exports.add = (title) => {
  // 读取之前的任务，从而追加/新增 任务
  fs.readFile(dbPath, { flag: "a+" }, (err1, data) => {
    if (err1) console.log(err1);
    let list = [];
    try {
      // 只有当data不为空时才尝试解析
      const content = data.toString();
      if (content) {
        list = JSON.parse(content);
      }
    } catch (err2) {
      console.log("解析失败，使用空列表", err2);
    }
    console.log("之前已有的任务列表：", list);
    // 追加任务
    const newTask = {
      title,
      done: false,
    };
    list.push(newTask);
    const str = JSON.stringify(list );
    fs.writeFile(dbPath, str + '\n', (err3) => {
      if (err3) console.log(err3);
      console.log("添加成功");
    });
  });
};
