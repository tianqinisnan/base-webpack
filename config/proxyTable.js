const ENV_PRE = 'https://www.google.com'

module.exports = {
  '/api': {
    target: ENV_PRE,
    changeOrigin: true
    // pathRewrite: {"^/api/user/v1" : "/user/v1"}
  }
}