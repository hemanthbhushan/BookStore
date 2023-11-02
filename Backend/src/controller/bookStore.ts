import dotenv from "dotenv";
import { Request, Response } from "express";
import bookSchema from "../schema/bookSchema";

class BookStore {
  constructor() {
    dotenv.config();
  }
  public async home(req: Request, res: Response) {
    try {
      return res.status(201).send("WelCome to the BookStore");
    } catch (error) {
      console.error("error occured : ", error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  }

  public async postBook(req: Request, res: Response) {
    try {
      const { title, author, publishYear } = req.body;
      if (!title || !author || !publishYear) {
        return res.status(400).send({ message: "Missing required fields" });
      }
      const data = {
        title,
        author,
        publishYear,
      };
      const dataFetched = await bookSchema.create(data);
      return res.status(201).send(dataFetched);
    } catch (error) {
      console.error("error occured : ", error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  }
  public async getBooks(req: Request, res: Response) {
    try {
      const dataFetched = await bookSchema.find({});

      if (!dataFetched || dataFetched.length == 0) {
        return res.status(404).send({ message: "No books Found" });
      }
      return res
        .status(201)
        .send({ count: dataFetched.length, data: dataFetched });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  public async getBookById(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const dataFetchedById = await bookSchema.findOne({ id });

      if (!dataFetchedById) {
        return res.status(404).send({ message: "Book not found" });
      }
      return res.status(200).send(dataFetchedById);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
  public async updateBookById(req: Request, res: Response) {
    try {
      const { id, title } = req.body;
      const data = { title: title };

      const dataFetched = await bookSchema.findOneAndUpdate(
        { id },
        { $set: data },
        {
          returnOriginal: false,
        }
      );
      if (!dataFetched) {
        return res.status(404).send({ message: "Book not Found" });
      }
      return res
        .status(200)
        .send({ message: `Book updated Successfully`, data: dataFetched });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
  public async deleteBookById(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const dataFetched = await bookSchema.findOneAndDelete(
        { id },
        {
          returnOriginal: false,
        }
      );
      if (!dataFetched) {
        return res.status(404).send({ message: "Book not Found" });
      }
      return res
        .status(200)
        .send({ message: `Book deleted Successfully `, data: dataFetched });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
}

export default new BookStore();
