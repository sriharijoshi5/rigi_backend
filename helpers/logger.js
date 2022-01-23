/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const LOGGER_PARM_CONFIG = {'product': "RIGI"}
const CATEGORY = "BACKEND";
functionname = 'na'
linenumber = "na"
thread = "na"

const customLevels = {
  levels: {
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    critical: 0
  }
};

const generateLogger = (fileName) => {
  const logger = createLogger({
    levels: customLevels.levels,
    transports: [
      new transports.DailyRotateFile({
        // this stores warn, error and critical logs only, see below
        level: "warn",
        dirname: "logs",
        filename: "error",
        datePattern: "YYYY-MM-DD",
        extension: ".log",
        format: format.combine(
          format.timestamp({format: 'yyyy-mm-dd_hh:mm:ss'}),
          format.json(),
          format.label({
            label: CATEGORY,
          }),
          format.printf((info) => {
            return `${info.timestamp} - ${LOGGER_PARM_CONFIG['product']} - ${info.label} - ${fileName}:${functionname}[${linenumber}] - ${process.pid}:${thread} - ${info.level} - ${info.message}`;
          })
        ),
        maxSize: "10m",
        maxFiles: "14d", // logs auto delete
      }),
      new transports.DailyRotateFile({
        // this stores all logs: debug, info, warn, error and critical logs
        level: "debug",
        dirname: "logs",
        filename: "server",
        datePattern: "YYYY-MM-DD",
        extension: ".log",
        format: format.combine(
          format.timestamp({format: 'yyyy-mm-dd_hh:mm:ss'}),
          format.json(),
          format.label({
            label: CATEGORY,
          }),
          format.printf((info) => {
            return `${info.timestamp} - ${LOGGER_PARM_CONFIG['product']} - ${info.label} - ${fileName}:${functionname}[${linenumber}] - ${process.pid}:${thread} - ${info.level} - ${info.message}`;
          })
        ),
        maxSize: "10m",
        maxFiles: "14d", // logs auto delete
      }),
      new transports.Console({
        level: "debug",
        format: format.combine(
          // format.colorize(),
          format.timestamp({format: 'YYYY-MM-DD_HH:mm:ss'}),
          format.label({
            label: CATEGORY,
          }),
          // Common Logging Format: timestamp – product&Version – containerID - component - filename:function[linenumber] – process id/name:threadname - severity – message
          format.printf((info) => {
            return `${info.timestamp} - ${LOGGER_PARM_CONFIG['product']} - ${info.label} - ${fileName}:${functionname}[${linenumber}] - ${process.pid}:${thread} - ${info.level} - ${info.message}`;
          })
        ),
      }),
    ],
  });

  return logger;
};

module.exports = generateLogger;
