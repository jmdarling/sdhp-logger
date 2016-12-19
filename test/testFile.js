const SdhpLogger = require('../app')

const logger = new SdhpLogger({
  logToConsole: false,
  logToFile: true,
  logFilePath: './logs/test.txt',
  minimumSeverity: SdhpLogger.severity.debug
})

logger.debug('Debug')
logger.info('Info')
logger.warning('Warning')
logger.error('Error')
