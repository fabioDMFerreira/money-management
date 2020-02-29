import errorTypes from "./ErrorTypes";
import { Express, Response, Request, NextFunction } from "express";
import logger from "../log/winstonLogger";

export default (app: Express) => app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof errorTypes.NotFound) {
    logger.warn(err.stack);
    return res.status(404).send(err.message);
  }

  logger.error(err.stack);
  next(err);
});
