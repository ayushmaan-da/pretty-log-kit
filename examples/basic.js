
const logger = require("../src");

logger.info("Application started");
logger.success("Database connected");
logger.warn("Memory usage is high");
logger.error("Something went wrong");

const customLogger = logger.createLogger({
    prefix: "MY-APP",
    timestamp: true,
    colors: true,
    debug: true
});

customLogger.info("Custom logger is working");
customLogger.debug("Debug mode enabled");

customLogger.info({
    userId: 101,
    status: "active"
});

customLogger.error(new Error("Database timeout"));
