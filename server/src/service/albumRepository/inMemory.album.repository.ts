import { injectable } from "inversify";

import albums from "./seed/albums.json";
import photos from "./seed/photos.json";
import { AlbumRepository } from "src/domain/AlbumRepository";
import ErrorTypes from "src/infra/error/ErrorTypes";
import Album from "src/domain/Album";
import PhotosGroupedByAlbum from "src/domain/PhotosGroupedByAlbum";

@injectable()
export class InMemoryAlbumRepository implements AlbumRepository {
  photos: PhotosGroupedByAlbum[]
  albums: Album[]

  constructor() {
    this.albums = albums;
    this.photos = photos;
  }

  list() {
    return Promise.resolve(this.albums);
  }

  listPhotosByAlbum(albumId: number) {
    const album: PhotosGroupedByAlbum = this.photos.find(album => album.albumId === albumId);

    if (!album) {
      throw new ErrorTypes.NotFound("Album", albumId);
    }

    return Promise.resolve(album.photos);
  }

  listPhotosGroupedByAlbum() {
    return Promise.resolve(photos);
  }

}
