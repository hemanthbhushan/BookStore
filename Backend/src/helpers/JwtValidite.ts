import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

const jwt = require("jsonwebtoken");

class JwtValidite {
  constructor() {
    dotenv.config();
  }
  public verifyjwt(req: Request, res: Response, next: NextFunction) {
    try {
      const token: any = req.headers;
      jwt
        .verify(token, process.env.SECRET_KEY)
        .then((temp: any) => console.log(temp))
        .catch((err: any) => {
          console.log(err);
        });
      next();
    } catch (error) {
      console.log(error);
    }
  }
}
export default new JwtValidite();
