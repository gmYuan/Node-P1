const { execFile } = require("child_process");

// 由于execFile 传入的是一个命令，以及对应的命令参数数组
// 所以不会 有注入命令的风险

// const userInput = "../ && pwd";
// const userInput = "./";

execFile(
  // execFile 默认不会从 PATH 环境变量中查找可执行文件
  // 所以需要 使用完整的 node 路径/ 或者 使用 shell: true 选项
  // process.execPath 会给出当前运行的 Node.js 可执行文件的完整路径
  process.execPath,
  ["ex2.3-child.js"],
  {
    cwd: "/Users/jiayin/Documents/learn-day/Node-P1/P6-child-process",
    // 在 execFile 的 options.env 中设置的环境变量只会影响子进程，
    // 不会影响当前的 Node.js 进程。
    env: {
      NODE_ENV: "development",
    },
    maxBuffer: 1024 * 1024 * 10,
  },
  (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log("stdout的数据是", stdout);
    console.log("execPath", process.execPath);
    // 打印的是 undefined，因为不会影响到 父进程
    // console.log("NODE_ENV", process.env.NODE_ENV);
  }
);
