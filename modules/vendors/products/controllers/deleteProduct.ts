import { Request, Response } from "express";
import validator from "validator";
import productsModel from "../../../../models/products.model";

const deleteProduct = async (req: Request, res: Response) => {
  const { product_id } = req.params;

  await productsModel.deleteOne({
    _id: product_id,
    vendor_id: req.vendor.vendor_id,
  });

  res.status(200).json({
    status: "Success",
    message: "Product deleted successfully",
  });
};

export default deleteProduct;
