const http = require('http')
const fs = require("node:fs");
const stream = require("node:stream");
const events = require("node:events");

const readStream = fs.createReadStream("./big_file.txt");

console.log("readStream对象--", readStream)

console.log("stream.Readable.prototype对象--", stream.Readable.prototype)

console.log("events.EventEmitter.prototype对象--", events.EventEmitter.prototype)