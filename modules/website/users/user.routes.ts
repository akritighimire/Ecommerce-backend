import { Router } from "express";
import userProfile from "./controllers/getUserProfile";
import usersAuth from "../../../handlers/usersAuth";

const UserRouter = Router();

UserRouter.use(usersAuth);

UserRouter.get("/profile", userProfile);


export default UserRouter;
