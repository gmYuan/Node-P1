
function myLog(prefix) {
  return (req, res, next) => {
    console.log(`${prefix}是： ${req.url}`);
    next()
  }
}

module.exports = myLog