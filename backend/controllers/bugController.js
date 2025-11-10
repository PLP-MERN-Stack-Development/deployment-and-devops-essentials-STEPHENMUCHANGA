const bugService = require('../services/bugService');
const { validateBug } = require('../utils/validators');
exports.createBug = async (req,res,next)=>{try{const{error}=validateBug(req.body);if(error)return res.status(400).json({message:error});const saved=await bugService.create(req.body);res.status(201).json(saved);}catch(err){next(err);}};
exports.getAllBugs = async (req,res,next)=>{try{res.json(await bugService.getAll());}catch(err){next(err);}};
exports.updateBug = async (req,res,next)=>{try{const u=await bugService.update(req.params.id,req.body);if(!u)return res.status(404).json({message:'Bug not found'});res.json(u);}catch(err){next(err);}};
exports.deleteBug = async (req,res,next)=>{try{const r=await bugService.remove(req.params.id);if(!r)return res.status(404).json({message:'Bug not found'});res.json({message:'Deleted'});}catch(err){next(err);}};