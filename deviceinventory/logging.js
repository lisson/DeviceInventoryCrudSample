const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: "logs/requests.log",
      } ),
    new transports.Console({})
  ],
});

module.exports = logger;