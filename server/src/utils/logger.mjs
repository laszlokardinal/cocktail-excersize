import winston from "winston";

const { colorize, combine, splat, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp, metadata }) => {
  let msg = `${timestamp} [${level}] : ${message} `;

  if (metadata) {
    msg += JSON.stringify(metadata);
  }

  return msg;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(colorize(), splat(), timestamp(), myFormat),
  transports: [new winston.transports.Console()],
});
