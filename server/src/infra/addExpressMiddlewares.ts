import express, { Express } from "express";
import compression from "compression";  // compresses requests
import * as bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import cors from "cors";

import { expressLogger } from "./log/winstonLogger";

export default (app: Express) => {
  app.set("port", process.env.PORT || 8000);

  app.use(cors());

  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(flash());
  app.use(lusca.xframe("SAMEORIGIN"));
  app.use(lusca.xssProtection(true));

  app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
  );

  if (process.env.NODE_ENV !== "testing") {
    app.use(expressLogger);
  }
};
