/* eslint no-console: 0 */
class Debug {
  /**
   * Print the message in console with NORMAL color.
   *
   * @param  {string} msg
   */
  log(msg) {
    console.log(msg);
  }

  /**
   * Print the message in console with BLUE color.
   *
   * @param  {string} msg
   */
  highlight(msg) {
    console.log('\x1b[36m%s\x1b[0m', msg);
  }

  /**
   * Print the message in console with YELLOW color.
   *
   * @param  {string} msg
   */
  warning(msg) {
    console.log('\x1b[33m%s\x1b[0m', msg);
  }

  /**
   * Print the message in console with RED color.
   *
   * @param  {string} msg
   */
  error(msg) {
    console.log('\x1b[31m%s\x1b[0m', msg);
  }

  /**
   * Print the message in console with GREEN color.
   *
   * @param  {string} msg
   */
  success(msg) {
    console.log('\x1b[32m%s\x1b[0m', msg);
  }
}

export default new Debug();
