const winston = require('winston');

module.exports = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp('YYYY-MM-DD HH:mm:ss.SSSS'),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ timestamp: true, filename: 'file.log' })
  ]
});
