const colors = require("colors");
const os = require("node:os");
const MainLoggerError = require("./utils/errors/MainLoggerError");

module.exports = class SBLJavaLogger {
  constructor(options = {}) {
    if (!options.dontClearConsole) {
      console.clear();
    }
    console.log(this.formatLogger("Loading logger class sbljavalogger"));
    console.log(
      this.formatLogger(
        `Node.JS version ${
          process.version
        }, running on ${os.version()}, installed at ${__dirname.replace(
          /\\Users\\([A-Za-z0-9\s]+([A-Za-z0-9\s]+)+)+\\/gi,
          "\\Users\\********\\"
        )}\\index.js`
      )
    );
    this.injectBeforeExit();
  }

  log(text) {
    if (typeof text !== "string") return this.ERROR_MAIN_T("Expected string for text parameter, received " + typeof text);
    console.log(this.formatLogger(text, "info"));
  }

  info(text) {
    if (typeof text !== "string") return this.ERROR_MAIN_T("Expected string for text parameter, received " + typeof text);
    console.log(this.formatLogger(text, "info"));
  }

  warn(text) {
    if (typeof text !== "string") return this.ERROR_MAIN_T("Expected string for text parameter, received " + typeof text);
    console.log(this.formatLogger(text, "warning"));
  }

  error(text) {
    if (typeof text !== "string") return this.ERROR_MAIN_T("Expected string for text parameter, received " + typeof text);
    console.log(this.formatLogger(text, "error"));
  }

  ERROR_MAIN_T(text) {
    console.log(
      `[${this.getCurrentTime()}] [project/ERROR]: ${text}:`
    );
    throw new MainLoggerError(text);
  }

  injectBeforeExit() {
    process.on("beforeExit", () => {
      console.log(this.formatLogger("Logger Shutting Down!", "warning"));
    });
  }

  getCurrentTime() {
    let hour =
      String(
        new Date().getHours() > 12
          ? new Date().getHours() - 12
          : new Date().getHours()
      ).length < 2
        ? "0" +
          String(
            new Date().getHours() > 12
              ? new Date().getHours() - 12
              : new Date().getHours()
          )
        : String(
            new Date().getHours() > 12
              ? new Date().getHours() - 12
              : new Date().getHours()
          );
    let minute =
      String(new Date().getMinutes()).length < 2
        ? "0" + String(new Date().getMinutes())
        : String(new Date().getMinutes());
    let second =
      String(new Date().getSeconds()).length < 2
        ? "0" + String(new Date().getSeconds())
        : String(new Date().getSeconds());
    return `${hour}:${minute}:${second}`;
  }

  formatLogger(text, loglevel) {
    loglevel = loglevel || "info";
    loglevel = String(loglevel).toUpperCase();

    if (!["INFO", "WARNING", "ERROR"].includes(loglevel)) {
      console.log(
        `[${this.getCurrentTime()}] [main/ERROR]: Expected "info" / "warning" / "error" for log level. Received ${loglevel}:`
      );
      throw new MainLoggerError(text);
    }

    return `[${this.getCurrentTime()}] [main/${loglevel}]: ${text}`;
  }
};
