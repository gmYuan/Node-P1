const { Writable } = require("node:stream");

const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log("chunk是--", chunk.toString());
    callback();
  },
});

// 这一句就相当于
// process.stdin.on("data", (chunk) => {
//   outStream.write(chunk);
// });

// 标准输入 → process.stdin（读取流） → outStream（写入流）
// process.stdin: 读取用户在终端输入的数据
// outStream 接收这些数据并处理（在例子中是 打印到控制台）

process.stdin.pipe(outStream);
