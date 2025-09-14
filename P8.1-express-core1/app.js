const express = require("express");
const app = express();
const port = 3000;

// 严格区分资源路径 大小写
app.set('case sensitive routing', true)

// 配置模板引擎，注意需要下载对应的 引擎模块
app.set('views', 'pages')
app.set('view engine', 'ejs')

// 把 req.body 解析成对象
app.use(express.json())
// 配置 静态资源目录
app.use(express.static('public'))
// 解析 urlencoded类型的 表单请求
app.use(express.urlencoded())

// 处理资源路径请求
app.get('/style.css', (req, res, next) => {
  res.send('我是style.css')
})

app.get('/test', (req, res, next) => {
  res.render('test3', {title: '我是 test标题啊'})
})

// 支持其他类型的请求
app.put('/med', (req, res, next) => {
  res.send('我是put方法 处理')
})

app.delete('/med', (req, res, next) => {
  res.send('我是delete方法 处理')
})

// 通用兜底处理
app.use( (req, res, next) => {
  console.log('req.body--', req.body)
  res.send('Hello World3!')
  next()
})


app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
