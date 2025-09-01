const fs = require('fs')

const stream = fs.createWriteStream('./big_file.txt')

for (let i = 0; i < 3000000; i++) {
  stream.write(`这是第 ${i} 行内容，我们需要很多很多内容要不停地写文件啊啊啊啊啊啊回车\n`)
}

stream.end()

console.log('文件写入done!')
