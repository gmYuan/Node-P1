const { execFile } = require("child_process");

// 由于execFile 传入的是一个命令，以及对应的命令参数数组
// 所以不会 有注入命令的风险

// const userInput = "../ && pwd";
const userInput = "./";

const stream = execFile("ls", ["-la", userInput]);

stream.stdout.on("data", (chunk) => {
  console.log("stdout的数据是", chunk);
});

stream.stderr.on("data", (chunk) => {
  console.log("stderr的数据是", chunk);
});
