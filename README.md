# SDHP Logger
Inspired by the [NancyFx Super Duper Happy Path](https://github.com/NancyFx/Nancy#the-super-duper-happy-path), this is
intented to be an easy to use logger for Node.js with no configuration required, unless you need to stray from the
defaults.

## Basic Usage
The basic use case is the use this to write nice formatted logs to the console.
```
const SdhpLogger = require('sdhp-logger')

const logger = new SdhpLogger()

logger.debug('Debug')     // [2016-12-19 21:52:23 UTC] [DEBUG] Debug
logger.info('Info')       // [2016-12-19 21:52:23 UTC] [INFO]  Info
logger.warning('Warning') // [2016-12-19 21:52:23 UTC] [WARN]  Warning
logger.error('Error')     // [2016-12-19 21:52:23 UTC] [ERROR] Error
```

## Advanced Usage
By providing a config to the constructor, you can unlock some more advanced functionality.

The default configuration is:
```
{
  logToConsole: true,
  logToFile: false,
  logFilePath: '',
  minimumSeverity: SdhpLogger.severity.debug
}
```

Any or all of these values can be overridden.

For example, if I wanted to write only warnings and errors to a file:
```
const SdhpLogger = require('../app')

const logger = new SdhpLogger({
  logToConsole: false,
  logToFile: true,
  logFilePath: './mylog.txt',
  minimumSeverity: SdhpLogger.severity.warning
})

logger.debug('Debug')     // Ignored, minimumSeverity too high
logger.info('Info')       // Ignored, minimumSeverity too high
logger.warning('Warning') // [2016-12-19 21:52:23 UTC] [WARN]  Warning in myLog.txt
logger.error('Error')     // [2016-12-19 21:52:23 UTC] [ERROR] Error   in myLog.txt
```
