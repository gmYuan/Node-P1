// 子进程 child.js

process.on("message", (message) => {
  console.log("子进程收到父进程的消息----", message);
});

process.send("我是子进程发出的消息呀");
