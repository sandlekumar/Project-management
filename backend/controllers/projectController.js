const Project=require("../models/Project");
const Task=require("../models/Task");

const createProject=async(req,res)=>{
    const project=new Project(req.body);
    await project.save();
    res.status(201).json(project);
}

const getProjects=async(req,res)=>{
    const projects=await Project.find();
    res.status(200).json(projects);
}

const getProject=async(req,res)=>{
    const project=await Project.findById(req.params.id);
    res.status(200).json(project);
}

const updateProject=async(req,res)=>{
    const project=await Project.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(project);
}

const deleteProject=async(req,res)=>{
    const project=await Project.findByIdAndDelete(req.params.id);
    res.status(200).json(project);
}

module.exports={createProject,getProjects,getProject,updateProject,deleteProject};