import Album from "./Album";
import Photo from "./Photo";
import PhotosGroupedByAlbum from "./PhotosGroupedByAlbum";

export interface AlbumRepository {
  list: () => Promise<Album[]>;
  listPhotosByAlbum: (albumId: number) => Promise<Photo[]>;
  listPhotosGroupedByAlbum: () => Promise<PhotosGroupedByAlbum[]>;
}
