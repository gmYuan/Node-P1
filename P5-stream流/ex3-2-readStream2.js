const http = require("http");
const fs = require("node:fs");

const server = http.createServer();

server.on("request", (req, res) => {
  const readStream = fs.createReadStream("./big_file.txt");
  readStream.pipe(res);
  readStream.pause();
  setTimeout(() => {
    readStream.resume();
  }, 4000);
});

server.listen(8888, () => {
  console.log("Server is running on port 8888");
  console.log("Current process PID:", process.pid);
});


