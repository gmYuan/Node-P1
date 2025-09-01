const { Duplex } = require("node:stream");

const inOutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log("chunk是", chunk.toString());
    callback();
  },

  read(size) {
    const char = String.fromCharCode(this.currentCharCode++);
    this.push(char + "\n");
    console.log("推入了char是", char);
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  },
});

inOutStream.currentCharCode = 65;

process.stdin.pipe(inOutStream).pipe(process.stdout);

/*

第一个管道：process.stdin.pipe(inOutStream)
  - 用户在终端输入数据
  - 数据流向 inOutStream 的写入端
  - 触发 inOutStream 的 write() 方法

第二个管道：inOutStream.pipe(process.stdout)
  - inOutStream 的读取端开始工作
  - 触发 read() 方法
  - 生成的字符流向 process.stdout，显示在终端

关键理解：
  - Duplex 流的读取端和写入端是完全独立的
  - 读取端：inOutStream → process.stdout（立即开始）
  - 写入端：process.stdin → inOutStream （等待用户输入）


核心原因: 流的消费者驱动模式
  - 有消费者（process.stdout）时，读取端立即开始工作
  - 没有生产者数据（用户未输入）时，写入端保持静默


*/
