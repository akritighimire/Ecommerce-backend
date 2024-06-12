import "express-async-errors";
import express  from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import errorHandler from "./handlers/errorHandler";

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.mongo_connect!, {})
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((e) => {
    console.log("Database Connection Failed");
    console.log(e);
  });

import "./model";
import VendorsAuthRoute from "./modules/vendors/auth/vendors.auth.routes";
import VendorsProductRoute from "./modules/vendors/products/vendors.products.routes";
import WebsiteProductsRouter from "./modules/website/products/website.products.routes";
import UserAuthRouter from "./modules/website/userAuth/userauth.routes";
import UserRouter from "./modules/website/users/user.routes";

//Routes

app.use("/api/v1/vendors/auth", VendorsAuthRoute); // yo postman ko post/get garda ramro saga herne 
app.use("/api/v1/vendors/products", VendorsProductRoute);



//Website Related

app.use("/api/v1/website/products", WebsiteProductsRouter);
app.use("/api/v1/website/users/auth", UserAuthRouter); // never forget api agadi ko "/". silly mistakes bruh
app.use("/api/v1/website/users", UserRouter);


//Error Handling

app.use(errorHandler);

//Starting Server
app.listen(8000, () => {
    console.log("Server started successfully");
});









