import express from "express";
import {
  userLogin,
  userRegister,
  logout,
  getMyProfile,
  getAllUsers,
} from "../controllers/admin.js";
import { isAuthenticatedAdmin } from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/logout", logout);

router.get("/myprofile", isAuthenticatedAdmin, getMyProfile);

router.get("/allusers", isAuthenticatedAdmin, getAllUsers);


// router.get("/:id", getUserById);

export default router;
