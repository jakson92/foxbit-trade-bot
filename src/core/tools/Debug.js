/* eslint no-console: 0 */
class Debug {
  log(msg) {
    console.log(msg);
  }

  highlight(msg) {
    console.log('\x1b[36m%s\x1b[0m', msg);
  }

  warning(msg) {
    console.log('\x1b[33m%s\x1b[0m', msg);
  }

  error(msg) {
    console.log('\x1b[31m%s\x1b[0m', msg);
  }

  success(msg) {
    console.log('\x1b[32m%s\x1b[0m', msg);
  }
}

export default new Debug();