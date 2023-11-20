import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../Models/admin.js";
import { User } from "../Models/users.js";
import { generateCookie } from "../utils/feature.js";

export const userRegister = async (req, res) => {
  const { name, email,phone,city,state, password } = req.body;
  let user = await Admin.findOne({ email });
  if (user)
    return res.status(404).json({
      success: false,
      message: "Admin Already exist..",
    });
  const hashPassword = await bcrypt.hash(password, 10);
  user = await Admin.create({
    name, email,phone,city,state, 
    password: hashPassword,
  });
  generateCookie(user, res, 201, "Admin Register Successfully!");
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let user = await Admin.findOne({ email });
  if (!user)
    return res.status(400).json({
      success: false,
      messge: "Admin Not exist",
    });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({
      success: false,
      message: "Invalid credential",
    });
  generateCookie(user, res, 201, `Welcome Admin ${user.name}`);
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logout successfully!",
    });
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const getAdminById = async (req, res) => {
  const id = req.params.id;

  const user = await Admin.findById(id);

  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid ID",
    });

  res.json({
    success: true,
    message: "This is single user",
    user,
  });
};

export const getAllUsers = async (req,res) =>{
  const users = await User.find();

  if (!users)
    return res.status(404).json({
      success: false,
      message: "No users found",
    });

  res.json({
    success:true,
    message:'All users',
    users
  })
}