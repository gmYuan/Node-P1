const http = require('http')
const fs = require("node:fs");

const server = http.createServer()

server.on('request', (req, res) => {
	fs.readFile('./big_file.txt', (err,data) => {
		if (err) throw err;
		res.end(data)
		console.log('文件读取完毕')
	})
})

server.listen(8888, () => {
  console.log('Server is running on port 8888')
	console.log('Current process PID:', process.pid);
})
