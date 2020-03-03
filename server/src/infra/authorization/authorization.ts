
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://mmanagement.auth0.com/.well-known/jwks.json"
  }),

  // Validate the audience and the issuer.
  audience: "GPHRHIFx8IAyvvFHSQEHiCeVfElOwu99",
  issuer: "https://mmanagement.auth0.com/",
  algorithms: ["RS256"]
});
