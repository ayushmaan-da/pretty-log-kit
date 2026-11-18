
const colors = {
    reset: "\x1b[0m",
    blue: "\x1b[34m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    gray: "\x1b[90m",
    cyan: "\x1b[36m"
};

function colorize(text, color, enabled = true) {
    if (!enabled) return text;

    return `${colors[color]}${text}${colors.reset}`;
}

module.exports = { colors, colorize };
