const SdhpLogger = require('../app')

const logger = new SdhpLogger({
  minimumSeverity: SdhpLogger.severity.debug
})

logger.debug('Debug')
logger.info('Info')
logger.warning('Warning')
logger.error('Error')
