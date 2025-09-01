const { Readable } = require("node:stream");

const inStream = new Readable();

inStream.push("hello world!\n");
inStream.push("My name is Ygm!\n");
inStream.push(null);

// 这一句就相当于
// inStream.on("data", (chunk) => {
//   process.stdout.write(chunk);
// });

// inStream.on("end", () => {
//   console.log("读取流结束");
// });

inStream.pipe(process.stdout);
