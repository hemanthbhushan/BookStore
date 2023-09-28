import { Request, Response } from "express";
import bcrypt from "bcrypt";
import loginSchema from "../schema/loginSchema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

class SignUpApi {
  constructor() {
    dotenv.config();
  }
  public async signup(req: Request, res: Response) {
    try {
      const { email, name, password, walletAddress } = req.body;

      const existingUser = await loginSchema.findOne({ walletAddress });

      if (existingUser) {
        return res.status(401).send({
          message: "already SignedUp",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await loginSchema.create({
        email,
        name,
        password: hashedPassword,
        walletAddress,
      });
      

      const token = jwt.sign(
        { email: email, id: result._id },
        process.env.SECRET_KEY as any,
        { expiresIn: "1800s" }
      );

      return res.status(200).send({
        user: result,
        token: token,
        message:"signedup Successful"
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        error: error,
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }

  public async signin(req: Request, res: Response) {
    try {
      const { email, walletAddress, password } = req.body;
      const existingUser = await loginSchema.findOne(
        { walletAddress },
        { password: 1 }
      );
      // console.log(existingUser, "user");

      if (!existingUser) {
        return res.status(401).send({
          message: "Need to Sign Up",
        });
      }

      const isMatch = await bcrypt.compare(
        password,
        String(existingUser.password)
      );

      if (!isMatch) {
        return res.status(401).send({
          message: "Invalid Credentials",
        });
      }
      const token = jwt.sign(
        { email: email, id: existingUser._id },
        process.env.SECRET_KEY as any,
        { expiresIn: 1000 }
      );

      res.status(200).send({
        user: existingUser,
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }

  public async deleteAccount(req: Request, res: Response) {
    try {
      const { walletAddress, name } = req.body;

      const temp = await loginSchema.findOneAndDelete(
        { walletAddress },
        { returnOriginal: false }
      );
      res.status(200).send({ message: temp, status: "success" });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
}

export default new SignUpApi();
