// 内置的 Transform 流

const fs = require("fs");
const zlib = require("zlib");
const crypto = require("crypto");
const { Transform } = require("stream");
const file = process.argv[2];

const printProgress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write(".");
    callback(null, chunk);
  },
});

fs.createReadStream(file)
  .pipe(crypto.createCipher("aes192", "12345"))
  .pipe(zlib.createGzip())
  .pipe(printProgress)
  .pipe(fs.createWriteStream(file + ".gz"))
  .on("finish", () => {
    console.log("done!");
  });
