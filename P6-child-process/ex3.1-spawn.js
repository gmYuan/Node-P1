const { spawn } = require("child_process");

// 用法与execFile方法类似
// 没有回调函数，只能通过 流事件获取结果
// 没有最大 200Kb 的限制(因为是流)
// 经验：能用 spawn 的时候, 就不要用 execFile

const userInput = "./";

// 例1：使用 ls 命令
// const stream = spawn("ls", ["-la", userInput], {
//   cwd: "/Users/jiayin/Documents/learn-day/Node-P1/P6-child-process",
//   env: {
//     NODE_ENV: "development",
//   },
// });

// 例2：使用 node 命令
const stream = spawn(process.execPath, ["ex2.3-child.js"], {
  cwd: "/Users/jiayin/Documents/learn-day/Node-P1/P6-child-process",
  env: {
    NODE_ENV: "development",
  },
});

stream.stdout.on("data", (chunk) => {
  console.log("stdout的数据是", chunk.toString());
});

// stream.stderr.on("data", (chunk) => {
//   console.log("stderr的数据是", chunk);
// });

stream.on("close", (code) => {
  console.log("子进程关闭，退出码 ", code);
});
