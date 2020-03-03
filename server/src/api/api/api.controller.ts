import {
  controller, httpGet,
} from "inversify-express-utils";

@controller("/api")
export class ApiController {

  @httpGet("/config")
  public getAuth0Config() {
    return {
      auth0domain: process.env.AUTH0_DOMAIN,
      auth0clientId: process.env.AUTH0_CLIENTID,
      couchdbUrl: process.env.COUCHDB_URL
    };
  }
}
