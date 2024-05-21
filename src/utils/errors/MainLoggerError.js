module.exports = class MainLoggerError extends Error {
    constructor(string, ...options) {
        super(string, ...options);
        Error.captureStackTrace?.(this, MainLoggerError);
    }
    
    get name() {
        return `sbl.utils.jlogger.MainLoggerException`;
    }
}