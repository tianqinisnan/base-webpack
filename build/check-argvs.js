'use strict'
const chalk = require('chalk')

const ARGV_TEST_ENV = 'build'
const ARGV_PROD_ENV = 'online'

function argCheck() {
  const EXIT_FAILURE = -1
  const ARGV_COUNT = 3
  const ARGV_ENV_INDEX = 2
  /**
   * process.argv
   * [
   *   '/usr/local/bin/node',
   *   '/Users/xxx/Documents/base-webpack/build/build.js',
   *   'online'
   * ]
   */
  if (process.argv.length < ARGV_COUNT) {
    sendError('missing parameter.')
  } else if (process.argv[ARGV_ENV_INDEX] === ARGV_TEST_ENV) {
    process.env.NODE_ENV = 'test' // 测试环境node编译
  } else if (process.argv[ARGV_ENV_INDEX] === ARGV_PROD_ENV) {
    process.env.NODE_ENV = 'production' // 生产环境node编译
  } else {
    sendError('invalid parameter.')
  }

  function sendError(errMsg) {
    console.log(chalk.red('[ERROR]') + ' ' + errMsg)
    console.log('')
    console.log(`Usage: node build.js [${ARGV_PROD_ENV}|${ARGV_TEST_ENV}]`)
    console.log(``)
    console.log(`Options:`)
    console.log(`  ${ARGV_PROD_ENV}:`, '\tbuild for online environment.')
    console.log(`  ${ARGV_TEST_ENV}:`, '\tbuild for test environment.')
    console.log(``)
    process.exit(EXIT_FAILURE)
  }
}

module.exports = argCheck
