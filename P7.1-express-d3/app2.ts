import express from "express";
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("你好!");
});

app.use("/xxx", (req, res, next) => {
  res.send("这是xxx页面")
  // res.send后不需要调用 next()
  // next()
})

app.post('xxx', (req, res, next) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});