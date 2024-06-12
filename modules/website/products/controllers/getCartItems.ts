import { Request, Response } from "express";
import cartsModel from "../../../../models/carts.model";

const getCartItems = async (req: Request, res: Response) => {
  const data = await cartsModel
    .find({
      user_id: req.user.user_id,
    })
    .populate("product_id");
    // .populate("product_id", {product_name: 1, product_price:1 }); selected items mattra pani garna milcha

  let total_amount = 0;

  data.map((singleItem: any) => {
    total_amount = total_amount + singleItem.price;
  });

  res.status(200).json({
    status: "cart",
    data: data,
    total_amount: total_amount,
  });
};

export default getCartItems;