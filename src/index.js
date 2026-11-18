
const { createLogger } = require("./logger");

const logger = createLogger();

logger.createLogger = createLogger;

module.exports = logger;
