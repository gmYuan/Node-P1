const http = require('http')
const fs = require("node:fs");

const server = http.createServer()

server.on('request', (req, res) => {
	const readStream = fs.createReadStream('./big_file.txt');
	readStream.pipe(res);

	readStream.on('data', (chunk) => {
		console.log('chunk是', chunk)
		// console.log('chunk是', chunk.toString())
	})

	readStream.on('end', () => {
		console.log('文件读取完毕')
	})
	readStream.on('error', (err) => {
		console.log('readStream的err是', err)
	})
})

server.listen(8888, () => {
  console.log('Server is running on port 8888')
	console.log('Current process PID:', process.pid);
})
