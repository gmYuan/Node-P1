const { fork } = require("child_process");

// 创建一个子进程，执行Node脚本
// fork(./child.js') 相当于 spawn('node', [./child.js'])

// 特点
// 会多出一个 message 事件，用于父子通信
// 多出-个 send 方法

const childOfParent = fork("./ex4.2-fork-child.js");

childOfParent.on("message", (message) => {
  console.log("父进程收到子进程的消息---", message);
});

childOfParent.send("hello from parent");
