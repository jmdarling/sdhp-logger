const chalk = require('chalk')
const fs = require('fs')
const os = require('os')

class SdhpLogger {

  constructor (config) {
    this._config = Object.assign({}, {
      logToConsole: true,
      logToFile: false,
      logFilePath: '',
      minimumSeverity: SdhpLogger.severity.debug
    }, config)
  }

  debug (message) {
    switch (this._config.minimumSeverity) {
      case SdhpLogger.severity.info:
      case SdhpLogger.severity.warning:
      case SdhpLogger.severity.error:
        return
    }

    const timestamp = this._getCurrentTimeStamp()
    const severity = SdhpLogger.severity.debug

    this._logToConsole(timestamp, chalk.green(severity), message)
    this._logToFile(timestamp, severity, message)
  }

  info (message) {
    switch (this._config.minimumSeverity) {
      case SdhpLogger.severity.warning:
      case SdhpLogger.severity.error:
        return
    }

    const timestamp = this._getCurrentTimeStamp()
    const severity = SdhpLogger.severity.info

    this._logToConsole(timestamp, chalk.blue(severity), message)
    this._logToFile(timestamp, severity, message)
  }

  warning (message) {
    switch (this._config.minimumSeverity) {
      case SdhpLogger.severity.error:
        return
    }

    const timestamp = this._getCurrentTimeStamp()
    const severity = SdhpLogger.severity.warning

    this._logToConsole(timestamp, chalk.yellow(severity), message)
    this._logToFile(timestamp, severity, message)
  }

  error (message) {
    const timestamp = this._getCurrentTimeStamp()
    const severity = SdhpLogger.severity.error

    this._errorToConsole(timestamp, chalk.red(severity), message)
    this._logToFile(timestamp, severity, message)
  }

  _errorToConsole (timestamp, severity, message) {
    if (this._config.logToConsole) {
      const timestampFormatted = this._rightPadWithSpaces(`[${timestamp}]`, 25)
      const severityFormatted = this._rightPadWithSpaces(`[${severity}]`, 17)
      const formattedMessage = `${timestampFormatted} ${severityFormatted} ${message}${os.EOL}`
      console.log(formattedMessage)
    }
  }

  _logToConsole (timestamp, severity, message) {
    if (this._config.logToConsole) {
      const timestampFormatted = this._rightPadWithSpaces(`[${timestamp}]`, 25)
      const severityFormatted = this._rightPadWithSpaces(`[${severity}]`, 17)
      const formattedMessage = `${timestampFormatted} ${severityFormatted} ${message}${os.EOL}`
      console.error(formattedMessage)
    }
  }

  _logToFile (timestamp, severity, message) {
    if (this._config.logToFile && this._config.logFilePath !== '') {
      const timestampFormatted = this._rightPadWithSpaces(`[${timestamp}]`, 25)
      const severityFormatted = this._rightPadWithSpaces(`[${severity}]`, 7)
      const formattedMessage = `${timestampFormatted} ${severityFormatted} ${message}${os.EOL}`

      fs.appendFile(this._config.logFilePath, formattedMessage, error => {
        if (error != null) {
          console.error(`Error appending to log file:${os.EOL}${error}${os.EOL}`)
        }
      })
    }
  }

  _getCurrentTimeStamp () {
    const date = new Date()
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} UTC`
  }

  _rightPadWithSpaces (str, minLength) {
    return str.length > minLength ? str : str + ' '.repeat(minLength - str.length)
  }
}

SdhpLogger.severity = {
  debug: 'DEBUG',
  info: 'INFO',
  warning: 'WARN',
  error: 'ERROR'
}

module.exports = SdhpLogger
