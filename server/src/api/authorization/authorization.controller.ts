import {
  controller, httpGet,
} from "inversify-express-utils";
import { inject } from "inversify";
import { Request } from "express";

import TYPES from "src/types";

@controller("/api/authorization")
export class AuthorizationController {

  @httpGet("/callback")
  public authorizationCallback() {
    return "Callback Done";
  }
}
