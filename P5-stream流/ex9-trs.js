const { Transform } = require("node:stream");

const UpCaseTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

process.stdin.pipe(UpCaseTr).pipe(process.stdout);

/*

1 Transform 流是"被动"的：
  - 它不会主动产生数据（没有 read() 方法）
  - 只有当有数据流入时，才会触发 transform() 方法
  - 输出的数据是对输入数据的转换


2 实际执行顺序
  - 1 程序启动：建立管道连接
  - 2 等待用户输入
    - process.stdout 订阅了 UpCaseTr 的 'data' 事件
    - 但 UpCaseTr 没有主动的 read() 方法，所以不会立即产生数据
    - 程序等待用户输入
  
  - 3 用户输入数据
    - 用户输入 "hello" →
    - process.stdin 产生数据 → 
    - UpCaseTr.transform() 被调用 执行
  
  - 4 输出结果
    - this.push("HELLO") 触发 'data' 事件
    - process.stdout 收到数据，输出 "HELLO"

*/
