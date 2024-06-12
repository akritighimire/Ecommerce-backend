import { Request, Response } from "express";
import validator from "validator";
import productsModel from "../../../../models/products.model";
// import _ from "lodash"; // yo chai string manipulation garne sano package

const addProduct = async (req: Request, res: Response) => {
  const { product_name, product_price, product_description, product_image } =
    req.body;

  if (!product_name) throw "Product name is required";
  if (!product_price) throw "Product price is required";

  if (!validator.isAlphanumeric(product_price.toString()))
    throw "Price is invallid";
  if (product_price < 1) throw "Price should be atleast Rs.1";

  // product_name = _.capitalize(product_name); // yesma use garna milcha lodash le

  await productsModel.create({
    vendor_id: req.vendor.vendor_id,
    product_name,
    product_price,
    product_description,
    product_image,
  });

  res.status(200).json({
    status: "Success",
    message: "Product added successfully",
  });
};

export default addProduct;
