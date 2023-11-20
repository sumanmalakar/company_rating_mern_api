import { Admin } from "../Models/admin.js";

import jwt from "jsonwebtoken";

export const isAuthenticatedAdmin = async (req, res, next) => {
  const { token } = req.cookies;

  console.log(token);

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Please Login As Admin..!",
    });

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  // console.log("decoded data ",decode)

  req.user = await Admin.findById(decode._id);

  // console.log(req.user);
  next();
};
