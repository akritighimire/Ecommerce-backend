import { Request, Response } from "express";
import validator from "validator";
import productsModel from "../../../../models/products.model";

const editProduct = async (req: Request, res: Response) => {
  const {
    product_id,
    product_name,
    product_price,
    product_description,
    product_image,
  } = req.body;

  if (!product_id) throw "Product id is required";
  if (!product_name) throw "Product name is required";
  if (!product_price) throw "Product price is required";

  if (!validator.isAlphanumeric(product_price.toString()))
    throw "Price is invallid";
  if (product_price < 1) throw "Price should be atleast Rs.1";

  //updateOne ko 1st paramater: find and 2nd parameter: kk update garne so updateOne({"find"},{"update"})
  await productsModel.updateOne(
    {
      //tyo particular post gareko vendor le mattra edit garna milos bhanera product id ra vendor id duitai check gareko.
      _id: product_id,
      vendor_id: req.vendor.vendor_id,
    },

    {
      //yo chai kk edit garna dine bhanera list out gareko
      product_name,
      product_price,
      product_description,
      product_image,
    }
  );

  res.status(200).json({
    status: "Success",
    message: "Product updated successfully",
  });
};

export default editProduct;
