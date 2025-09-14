const express = require("express");
const myLog = require("./myLog");


const app = express();
const port = 3000;

app.use(myLog('dev'))

/**  1 app.use的 基本用法 */
// app.use((req, res, next) => {
//   res.write("Hello World!");
//   next()
// })
//
//
// app.use((req, res, next) => {
//   res.write("HaHa2");
//   next()
// })
//
// app.use((req, res, next) => {
//   res.end()
//   next()
// })

/**  2 app.use的 路由用法 */
// app.use((req, res, next) => {
//   if (req.path === '/') {
//     res.send("这是根目录")
//   }
//   next()
// })
//
// app.use("/xxx", (req, res, next) => {
//   res.send("这是xxx页面")
//   // res.send后不需要调用 next()
//   // next()
// })
//
// app.get("/yyy", (req, res, next) => {
//   res.send("这是yyy页面")
//   // next()
// })
//
// app.route("/zzz").all((req, res, next) => {
//   res.write('zzz\n')
//   next()
// }).get((req, res, next) => {
//   res.write('---zzz of get')
//   next()
// }).post((req, res, next) => {
//   res.write('我是zzz的post')
//   next()
// }).all((req, res, next) => {
//   res.send()
//   next()
// })

app.use((req, res, next) => {
  console.log('1')
  next()
})

app.use((req, res, next) => {
  console.log('2')
  next('无继续权限')
})

app.use((req, res, next) => {
  res.write('3')
  res.end()
  next()
})

app.use((err, req, res, next) => {
  // 检查响应是否已经开始
  res.status(500);
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.write(`错误: ${err}`);
  res.end();
})


app.listen(port, () => {
  console.log(`app is listening on port ${port} ...`);
});
