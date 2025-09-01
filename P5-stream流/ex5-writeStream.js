// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.

const fs = require("node:fs");

function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // Last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
        if (!ok) {
          console.log("写的太快了，需要等待drain");
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once("drain", () => {
        console.log("drain触发- 干涸了，可以继续写入");
        write();
      });
    }
  }
}

const writeStream = fs.createWriteStream("./big_file2.txt");

writeOneMillionTimes(writeStream, "hello world!\n", "utf-8", () => {
  console.log("写入完成");
});
