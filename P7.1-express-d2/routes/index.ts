import {RequestHandler} from "express-serve-static-core";

const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express-3' });
} as RequestHandler);

console.log('-- routes里的index.ts被执行了 --');


module.exports = router;
