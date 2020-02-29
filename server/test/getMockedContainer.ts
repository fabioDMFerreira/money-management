import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";

import TYPES from "../src/types";
import { AlbumRepository } from "src/domain/AlbumRepository";
import "src/api/album";
import { InMemoryAlbumRepository } from "src/service/albumRepository/inMemory.album.repository";
import addExpressMiddlewares from "src/infra/addExpressMiddlewares";
import expressErrorMiddleware from "src/infra/error/expressErrorMiddleware";

process.env.NODE_ENV = "testing";

const container = new Container();
container.bind<AlbumRepository>(TYPES.AlbumRepository).to(InMemoryAlbumRepository);

const server = new InversifyExpressServer(container);

const app = server
  .setConfig(addExpressMiddlewares)
  .setErrorConfig(expressErrorMiddleware)
  .build();

export default app;
