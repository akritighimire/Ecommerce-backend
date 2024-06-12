import { Request, Response } from "express";

import bcrypt from "bcrypt";
// import { uuid } from "uuidv4";
import jwt from "jsonwebtoken";
import vendorModel from "../../../../models/vendors.model";

const vendorsLogin = async (req: any, res: Response) => {
  const { email, password } = req.body;

  // const uniqueId = uuid();

  // try {
  if (!email) throw "Email is reqd";
  if (!password) throw "Password is reqd";

  const getUser = await vendorModel
    .findOne({
      email:email,
    })
    .select("+password"); // yo bhaneko chai password dekhaune login ko lagi must bhayera

  if (!getUser) throw "This vendor email does not exist";

 //if everything is good, move forward

 //compare password
 let comparePassword = await bcrypt.compare(password, getUser.password);
 if(!comparePassword) throw "Password donot match";

//  const accessToken = JwtCreator(getUser._id.toString());

const jwtPayload = {
    vendor_id :getUser._id,
  };

  const accessToken = jwt.sign(jwtPayload, process.env!.jwt_secret_vendor!, {
    expiresIn: "90days",
  });


  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    accessToken,
  });
 
};

export default vendorsLogin;
