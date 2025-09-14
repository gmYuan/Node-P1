const express = require('express')
const router = express.Router();


router.get('/', (req, res, next) => {
  res.send('我是user路由')
})

router.get('/:id', (req, res, next) => {
  console.log('req.params--', req.params)
  res.send('我是user路由id' + req.params.id)
})

router.get('/:id/edit', (req, res, next) => {
  console.log('req.params--', req.params)
  console.log('req.query--', req.query)
  res.send('我是user路由的编辑页面' + req.query.name)
})

module.exports = router;
