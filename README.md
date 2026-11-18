
# pretty-log-kit

**Beautiful logs. Zero hassle.**

A lightweight and customizable terminal logging utility for Node.js.

## Features

- Five logging levels: info, success, warn, error and debug.
- Colorful terminal output.
- Automatic timestamps.
- Custom application prefixes.
- Debug mode configuration.
- Object and Error message support.
- Enable or disable colors and timestamps.
- Zero external dependencies.

## Installation

```bash
npm install pretty-log-kit
```

## Quick Start

```javascript
const logger = require("pretty-log-kit");

logger.info("Application started");
logger.success("Database connected");
logger.warn("Memory usage is high");
logger.error("Something went wrong");
logger.debug("Debug information");
```

## Custom Logger

Create a logger with your own configuration:

```javascript
const logger = require("pretty-log-kit");

const appLogger = logger.createLogger({
    prefix: "MY-APP",
    timestamp: true,
    colors: true,
    debug: true
});

appLogger.info("Application started");
appLogger.success("Server running");
appLogger.debug("Debug mode enabled");
```

## Configuration

| Option | Type | Default | Description |
|---|---|---|---|
| prefix | String | "" | Custom application prefix |
| timestamp | Boolean | true | Display timestamps |
| colors | Boolean | Auto | Enable terminal colors |
| debug | Boolean | false | Enable debug messages |

## Logging Methods

| Method | Description |
|---|---|
| info() | General information |
| success() | Successful operations |
| warn() | Warning messages |
| error() | Error messages |
| debug() | Debugging information |

## Object Support

```javascript
logger.info({
    userId: 101,
    status: "active"
});
```

## Error Support

```javascript
logger.error(new Error("Database connection failed"));
```

## Running Tests

```bash
npm test
```

Uses Node.js built-in test runner.

## Requirements

- Node.js 18 or higher.

## License

MIT License.
