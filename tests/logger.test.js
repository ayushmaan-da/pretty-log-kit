
const test = require("node:test");
const assert = require("node:assert");
const { createLogger } = require("../src/logger");

function captureLogs(run) {
    const originalWrite = process.stdout.write;
    const originalErrorWrite = process.stderr.write;

    const output = [];
    const errors = [];

    process.stdout.write = function (chunk) {
        output.push(chunk.toString());
        return true;
    };

    process.stderr.write = function (chunk) {
        errors.push(chunk.toString());
        return true;
    };

    try {
        run();
    } finally {
        process.stdout.write = originalWrite;
        process.stderr.write = originalErrorWrite;
    }

    return {
        output: output.join(""),
        errors: errors.join("")
    };
}

test("info logger prints messages", () => {
    const logger = createLogger({ timestamp: false, colors: false });

    const result = captureLogs(() => logger.info("Hello"));

    assert.match(result.output, /INFO Hello/);
});

test("success logger prints messages", () => {
    const logger = createLogger({ timestamp: false, colors: false });

    const result = captureLogs(() => logger.success("Completed"));

    assert.match(result.output, /SUCCESS Completed/);
});

test("warn logger prints messages", () => {
    const logger = createLogger({ timestamp: false, colors: false });

    const result = captureLogs(() => logger.warn("Warning"));

    assert.match(result.output, /WARN Warning/);
});

test("error logger writes to stderr", () => {
    const logger = createLogger({ timestamp: false, colors: false });

    const result = captureLogs(() => logger.error("Failed"));

    assert.match(result.errors, /ERROR Failed/);
});

test("debug logger is disabled by default", () => {
    const logger = createLogger({ timestamp: false, colors: false });

    const result = captureLogs(() => logger.debug("Debug"));

    assert.strictEqual(result.output, "");
});

test("debug logger works when enabled", () => {
    const logger = createLogger({
        timestamp: false,
        colors: false,
        debug: true
    });

    const result = captureLogs(() => logger.debug("Debug"));

    assert.match(result.output, /DEBUG Debug/);
});

test("custom prefix is displayed", () => {
    const logger = createLogger({
        prefix: "TEST",
        timestamp: false,
        colors: false
    });

    const result = captureLogs(() => logger.info("Hello"));

    assert.match(result.output, /\[TEST\]/);
});

test("objects are formatted as JSON", () => {
    const logger = createLogger({ timestamp: false, colors: false });

    const result = captureLogs(() =>
        logger.info({ id: 1 })
    );

    assert.match(result.output, /{"id":1}/);
});

test("Error objects are formatted correctly", () => {
    const logger = createLogger({ timestamp: false, colors: false });

    const result = captureLogs(() =>
        logger.error(new Error("Something failed"))
    );

    assert.match(result.errors, /Error: Something failed/);
});

test("invalid configuration throws an error", () => {
    assert.throws(
        () => createLogger({ timestamp: "yes" }),
        TypeError
    );
});
