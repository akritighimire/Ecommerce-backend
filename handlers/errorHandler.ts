import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: Error,
  req: Request, // yo request ra response ulto lekhera mistake na garne.
  res: Response,
  next: NextFunction
) => {
  if (error) {
    console.log(error);
    if (typeof error === "string") {
      res.status(200).json({
        status: "failed",
        message: error,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "something is wrong",
      });
    }
  } else{
    next();
  }
};

export default errorHandler;
