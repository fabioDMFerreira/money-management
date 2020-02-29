import PouchDB from 'pouchdb';

interface Config {
  auth0domain: string;
  auth0clientId: string;
  couchdbUrl: string;
}

export class BackendClient {
  config?: Config;
  pouchDB?: any;

  async loadConfig() {
    try {
      const response = await fetch('/api/config');
      this.config = await response.json();
    } catch (_) {
      console.log('***Offline version***');
    }
  }

  async loadPouchDB(url = 'offline-db') {
    this.pouchDB = new PouchDB(url);

    return this.pouchDB;
  }
}
