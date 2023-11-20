import express from 'express'
import { isAuthenticatedAdmin } from '../middlewares/adminAuth.js';
import {isAuthenticated} from '../middlewares/auth.js'
import {
  createCompany,
  deleteCompany,
  getAllCompanys,
  getCompanyById,
  companyRating,

} from "../controllers/company.js";

const router = express.Router();

router.post('/new',isAuthenticatedAdmin,createCompany);

router.delete('/:id',isAuthenticatedAdmin,deleteCompany);

router.get('/all', isAuthenticatedAdmin, getAllCompanys);

router.post('/rating/:id',isAuthenticated,companyRating); 



export default router;