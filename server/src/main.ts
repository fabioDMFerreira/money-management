import { checkJwt } from "./infra/authorization/authorization";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import * as express from "express";

import TYPES from "./types";
import { AlbumRepository } from "./domain/AlbumRepository";
import { InMemoryAlbumRepository } from "./service/albumRepository/inMemory.album.repository";
import addExpressMiddlewares from "./infra/addExpressMiddlewares";
import expressErrorMiddleware from "./infra/error/expressErrorMiddleware";

import { albumControllerFactory } from "./api/album/album.controller";
import "./api";

// load everything needed to the Container
const container = new Container();
container.bind<AlbumRepository>(TYPES.AlbumRepository).to(InMemoryAlbumRepository);
container.bind<express.RequestHandler>(TYPES.AuthorizationMiddleware).toConstantValue(checkJwt);

albumControllerFactory(container);

const server = new InversifyExpressServer(container);


// start the server
const app = server
  .setConfig(addExpressMiddlewares)
  .setErrorConfig(expressErrorMiddleware)
  .build();

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
