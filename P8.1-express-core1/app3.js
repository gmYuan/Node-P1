const express = require("express");
const app = express();
const port = 3000;

const IUser = require('./routes/IUser')

// 配置模板引擎，注意需要下载对应的 引擎模块
app.set('views', 'pages')
app.set('view engine', 'ejs')

// 配置默认中间件
app.use(express.json())

// 配置路由中间件处理
app.use('/users', IUser)


// 通用兜底处理
app.use( (req, res, next) => {
  console.log('req.body--', req.body)
  res.send('Hello World3!')
})


app.listen(port, () => {
  console.log(`app3 is listening on port ${port}`);
});