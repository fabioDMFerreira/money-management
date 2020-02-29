export interface Entity<T> {
  id: string;
}

export interface Repository<T> {
  readAll(): Promise<T[]>;
  readOneById(id: string): Promise<T>;
  // ...
}

export interface Album {
  id: number;
  title: string;
}

export interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  ranking?: number;
}
