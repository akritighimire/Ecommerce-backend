import { Request, Response } from "express";
import bcrypt from "bcrypt";
// import { uuid } from "uuidv4";
import jwt from "jsonwebtoken";
import vendorModel from "../../../../models/vendors.model";

const vendorsSignup = async (req: Request, res: Response) => {

    //getting data from req.body
  const { email, password, confirm_password, business_name  } = req.body;

  // const uniqueId = uuid();

  // try {
  if (!email) throw "Email is reqd";
  if (!password) throw "Password is reqd";


  if(password != confirm_password)
    throw "Password and confirm password do not match";

  if(!business_name) throw "Business name is required";
  if(business_name.length < 3) throw "Name must be atleast 3 characters long!";

  //Database Validation 

  const existingUser = await vendorModel.findOne({
    email,
  });

  if(existingUser) throw "This email already exists! Please try another!";


  //if everything is good move forward

  // hashing password so that even if our DB is compromised, we don't expose user passwords. 
  //Hashed password cannot br converted back to original string, can only be compared

  let encryptedPassword = await bcrypt.hash(password, 8);

  const createdUser = await vendorModel.create({
    email,
    business_name,
    password: encryptedPassword.toString(),
  });

  const jwtPayload = {
    vendor_id :createdUser._id,
  };

  const accessToken = jwt.sign(jwtPayload, process.env!.jwt_secret_vendor!, {
    expiresIn: "90days",
  });



  // await usersModel.updateOne({ email }, { auth_id: uniqueId }); //({finder},{setter})

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    accessToken,
    
  });
  
};

export default vendorsSignup;
