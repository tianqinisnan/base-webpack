// https://segmentfault.com/a/1190000008742240
module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "semi": "error",
    "no-console": "off",
    "linebreak-style": "off",
    "eol-last": "off",
    "no-param-reassign": 0,
    "indent": ["error",2]
  },
  "env": {
    "browser": true,
    "node": true
  }
}