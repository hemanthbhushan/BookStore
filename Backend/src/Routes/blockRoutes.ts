import { Router } from "express";
const blockRoutes: Router = Router();
import bookStore from "../controller/bookStore";
import signupAndLogin from "../controller/signupAndLogin";
blockRoutes.get("/", bookStore.home);
blockRoutes.post("/postBook", bookStore.postBook);
blockRoutes.get("/getBooks", bookStore.getBooks);
blockRoutes.get("/:id", bookStore.getBookById);
blockRoutes.put("/:id", bookStore.updateBookById);
blockRoutes.delete("/:id", bookStore.deleteBookById);
blockRoutes.post("/signup", signupAndLogin.signup);
blockRoutes.get("/login", signupAndLogin.signin);

export default blockRoutes;
