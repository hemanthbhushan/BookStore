import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

const jwt = require("jsonwebtoken");

class JwtValidite {
  constructor() {
    dotenv.config();
  }
  public verifyjwt(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string | undefined = req.headers.authorization as string;
      console.log(token, "token");
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      jwt.verify(token, process.env.SECRET_KEY as string);

      next();
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error", error: error });
    }
  }
}
export default new JwtValidite();
