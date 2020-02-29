import * as winston from "winston";
import * as expressWinston from "express-winston";
import { Request, Response } from "express";
// import { ConsoleTransportOptions } from "winston/lib/winston/transports";

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ],
};

const logger = winston.createLogger(options);

export default logger;

const expressWinstonOptions: expressWinston.LoggerOptionsWithTransports = {
  level: (req: Request, res: Response) => {
    let level = "";
    if (res.statusCode >= 100) { level = "info"; }
    if (res.statusCode >= 400) { level = "warn"; }
    if (res.statusCode >= 500) { level = "error"; }
    // Ops is worried about hacking attempts so make Unauthorized and Forbidden critical
    if (res.statusCode == 401 || res.statusCode == 403) { level = "critical"; }
    // No one should be using the old path, so always warn for those
    // if (req.path === "/v1" && level === "info") { level = "warn"; }
    return level;
  },
  transports: (() => {
    return [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      })
    ];
  })()
};

export const expressLogger = expressWinston.logger(expressWinstonOptions);
export const winstonStreamer = {
  write: (message: string) => logger.info(message)
};


