
const { colorize } = require("./colors");

const levels = {
    info: { label: "INFO", color: "blue", symbol: "ℹ" },
    success: { label: "SUCCESS", color: "green", symbol: "✔" },
    warn: { label: "WARN", color: "yellow", symbol: "⚠" },
    error: { label: "ERROR", color: "red", symbol: "✖" },
    debug: { label: "DEBUG", color: "gray", symbol: "◆" }
};

function createLogger(options = {}) {
    const config = {
        prefix: options.prefix ?? "",
        timestamp: options.timestamp ?? true,
        colors: options.colors ?? process.stdout.isTTY ?? false,
        debug: options.debug ?? false
    };

    if (typeof config.prefix !== "string") {
        throw new TypeError("prefix must be a string");
    }

    for (const key of ["timestamp", "colors", "debug"]) {
        if (typeof config[key] !== "boolean") {
            throw new TypeError(`${key} must be a boolean`);
        }
    }

    function formatMessage(message) {
        if (message instanceof Error) {
            return `${message.name}: ${message.message}`;
        }

        if (typeof message === "string") {
            return message;
        }

        if (message === undefined) {
            return "undefined";
        }

        if (typeof message === "bigint") {
            return message.toString();
        }

        try {
            return JSON.stringify(message) ?? String(message);
        } catch {
            return String(message);
        }
    }

    function log(level, message) {
        if (level === "debug" && !config.debug) return;

        const settings = levels[level];
        if (!settings) return;

        const time = config.timestamp
            ? `[${new Date().toLocaleTimeString()}]`
            : "";

        const prefix = config.prefix
            ? `[${config.prefix}]`
            : "";

        const label = `${settings.symbol} ${settings.label}`;

        const output = [
            colorize(time, "gray", config.colors),
            colorize(prefix, "cyan", config.colors),
            colorize(label, settings.color, config.colors),
            formatMessage(message)
        ].filter(Boolean).join(" ");

        const stream = level === "error" ? process.stderr : process.stdout;
        stream.write(output + "\n");
    }

    return {
        info: message => log("info", message),
        success: message => log("success", message),
        warn: message => log("warn", message),
        error: message => log("error", message),
        debug: message => log("debug", message)
    };
}

module.exports = { createLogger };
