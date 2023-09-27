import { Router } from "express";
const blockRoutes: Router = Router();
import bookStore from "../controller/bookStore";
import signupAndLogin from "../controller/signupAndLogin";
import JwtValidite from "../helpers/JwtValidite";
blockRoutes.get("/", bookStore.home);
blockRoutes.post("/postBook",JwtValidite.verifyjwt, bookStore.postBook);
blockRoutes.get("/getBooks", bookStore.getBooks);
blockRoutes.get("/getBookBId", bookStore.getBookById);
blockRoutes.put("/updateBook", JwtValidite.verifyjwt, bookStore.updateBookById);
blockRoutes.delete("/deleteBook", JwtValidite.verifyjwt, bookStore.deleteBookById);
blockRoutes.post("/signup", signupAndLogin.signup);
blockRoutes.post("/signin", signupAndLogin.signin);

export default blockRoutes;
