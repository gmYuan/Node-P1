const { exec } = require("child_process");
const { promisify } = require("util");

const exec2 = promisify(exec);

const userInput = "../ && pwd";
// 上述是可以正常执行的，所以就有可能被注入，比如 rm -rf ../
// const userInput = "../ && rm -rf ../";

exec2("ls " + userInput).then(({ stdout, stderr }) => {
  console.log("stdout的数据是", stdout);
  console.log("stderr的数据是", stderr);
});
