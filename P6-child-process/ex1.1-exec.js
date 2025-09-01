const { exec } = require("child_process");

// 例子1：打开IINA
// exec("open /Applications/IINA.app", (err, stdout, stderr) => {
//   if (err) {
//     console.error(`exec error: ${err}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });

// 例子2：
const stream = exec("ls -l ../");
stream.stdout.on("data", (chunk) => {
  console.log("stdout的数据是", chunk);
});
stream.stderr.on("data", (chunk) => {
  console.log("stderr的数据是", chunk);
});
