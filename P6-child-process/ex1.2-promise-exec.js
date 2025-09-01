const { exec } = require("child_process");
const { promisify } = require("util");

const exec2 = promisify(exec);

exec2("ls -l ../").then(({ stdout, stderr }) => {
  console.log("stdout的数据是", stdout);
  console.log("stderr的数据是", stderr);
});
