import { Router } from "express";

import vendorAuth from "../../../handlers/vendorAuth";

import getProduct from "./controllers/getProduct";
import addProduct from "./controllers/addProduct";
import editProduct from "./controllers/editProduct";
import deleteProduct from "./controllers/deleteProduct";

// import vendorsSignup from "./controllers/vendorsSignup";
// import vendorsLogin from "./controllers/vendorsLogin";

const VendorsProductRoute = Router();

VendorsProductRoute.use(vendorAuth);

VendorsProductRoute.get("/", getProduct);
VendorsProductRoute.post("/", addProduct);
VendorsProductRoute.patch("/", editProduct);
VendorsProductRoute.delete("/:product_id", deleteProduct);
// VendorsAuthRoute.post("/login", vendorsLogin);

export default VendorsProductRoute;
