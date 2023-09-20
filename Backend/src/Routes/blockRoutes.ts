import { Router } from "express";
const blockRoutes: Router = Router();
import bookStore from "../controller/bookStore";
blockRoutes.get("/", bookStore.home);
blockRoutes.post("/postBook", bookStore.postBook);
blockRoutes.get("/getBooks", bookStore.getBooks);
blockRoutes.get("/:id", bookStore.getBookById);
blockRoutes.put("/:id", bookStore.updateBookById);
blockRoutes.delete("/:id", bookStore.deleteBookById);

export default blockRoutes;
