import { Router } from "express";
import userSignup from "./controllers/userRegister";
import usersLogin from "./controllers/userLogin";

const UserAuthRouter = Router();

UserAuthRouter.post("/register", userSignup);
UserAuthRouter.post("/login", usersLogin);

export default UserAuthRouter;
