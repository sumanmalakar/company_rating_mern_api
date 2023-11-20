import { Company } from "../Models/company.js";

export const createCompany = async (req,res)=>{

    const {name} = req.body;
   
  await Company.create({
       name
    })

    res.status(201).json({
        success:true,
        message:'Company added Successfully!'
    })
}


export const deleteCompany = async (req,res)=>{
    const id = req.params.id;

    const company = await Company.findById(id);
    
    if(!company) return res.status(404).json({
        success:false,
        message:"Invalid ID"
    })

    await company.deleteOne();

    res.json({
        success:true,
        message:" company deleted",
       
    })
}

export const getAllCompanys = async(req,res) =>{

    const companys = await Company.find();
    
    if(!companys) return res.status(404).json({
        success:false,
        message:"There is no blogs"
    })

    res.json({
        success:true,
        message:"All blogs",
        companys
       
    })
}


export const getCompanyById = async (req,res) =>{
    const id = req.params.id;
    const company = await Company.findById(id);   
    if(!company) return res.status(404).json({
        success:false,
        message:"Invalid ID"
    })
    res.json({
        success:true,
        message:"your company",
        company
    })
}


export const companyRating = async (req,res) =>{
    const id = req.params.id;
    const company = await Company.findById(id);
    if (!company)
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
       company.ratings.push(req.body.rating);
       await company.save();
       res.json(company);
}