const express = require("express");
const app = express();
const port = 3000;

// 配置模板引擎，注意需要下载对应的 引擎模块
app.set('views', 'pages')
app.set('view engine', 'ejs')

// 把 req.body 解析成对象
// app.use(express.json())
// 配置 静态资源目录
app.use(express.static('public'))
// 解析 urlencoded类型的 表单请求
app.use(express.urlencoded())

// ----------------------------
// 路由参数：req.params.paramName
// 查询参数：req.query.paramName
// 请求体参数：req.body.paramName


// 处理资源路径请求- req.params
app.post('/goods/:goodsId', (req, res, next) => {
  console.log('req.params--', req.params)
  res.send('我是goods详情页1')
})

// 处理资源路径请求- req.param
app.get('/users/:userName', (req, res, next) => {
  console.log('req.query--', req.query)
  res.send('我是users详情页1')
})


// ----------------------------
// 设置 append头方法
app.get('/test1', (req, res, next) => {
  res.set('x-name', 'zf')
  res.append('x-name', 'zf2')
  res.status(401)
  res.send('我是test1')
})


// ----------------------------
// 设置 重定向
app.get('/test2', (req, res, next) => {
  // res.status(301)
  // res.location('/test22')
  // res.end('重定向')
  // 不能写 next()，否则会触发 兜底处理
  // next()

  // 另一种简洁实现方法
  res.redirect('/test222')
  res.end()
})

app.get('/test222', (req, res, next) => {
  res.send('我是test222哈')
})



// 通用兜底处理
app.use( (req, res, next) => {
  console.log('req.body--', req.body)
  res.send('Hello World3!')
})


app.listen(port, () => {
  console.log(`app2 is listening on port ${port}`);
});
