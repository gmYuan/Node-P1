const { Readable } = require("node:stream");

/*

为什么可以直接调用 this.push 方法？
  - 因为 inStream 是 Readable 类的实例，而 push() 是 Readable 类的内置方法。
  - push() 方法的作用：
    - 将数据推入到可读流的内部缓冲区
    - 触发 'data' 事件，让消费者可以读取数据
  
  - 当 push(null) 时，表示流结束，触发 'end' 事件

*/
const inStream = new Readable({
  read(size) {
    // console.log("read", size);
    const char = String.fromCharCode(this.currentCharCode++);
    // 这里的 this 就是 inStream 实例
    this.push(char + "\n");
    console.log("推入了char是", char);
    // 90 是 Z 的 ASCII 码
    if (this.currentCharCode > 90) {
      this.push(null); // 结束流
    }
  },
});

inStream.currentCharCode = 65;

// 这一句就相当于
// inStream.on("data", (chunk) => {
//   process.stdout.write(chunk);
// });

// inStream.on("end", () => {
//   console.log("读取流结束");
// });

inStream.pipe(process.stdout);

/*
inStream.pipe(process.stdout)的 执行流程

1. inStream.pipe(process.stdout) 建立管道
  - 这行代码建立了 inStream 到 process.stdout 的管道
  - 内部会监听 inStream 的 'data' 和 'end' 事件

2. pipe() 会自动调用 inStream 的 read() 方法来获取数据
  - Node.js 流系统 检测到有消费者，开始读取数据

3. read() 生成 'A\n' 并 push
  - 将数据推入内部缓冲区
  - 触发 'data' 事件
  - pipe() 内部监听到 'data' 事件，调用 process.stdout.write(char + "\n")


4. 终端显示 'A'

5. 流系统再次调用 read() 方法

6. read() 生成 'B\n' 并 push
7. ... 重复直到 Z

8. push(null) 结束流
  - 触发 'end' 事件
  - pipe() 内部监听到 'end' 事件，调用 process.stdout.end()


*/
