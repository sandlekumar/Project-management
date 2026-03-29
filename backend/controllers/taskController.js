const Task=require("../models/Task");
const Project=require("../models/Project");

const createTask=async(req,res)=>{
    try{
        const task=new Task(req.body);
        await task.save();
        res.status(201).json(task);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const getTasks=async(req,res)=>{
    try{
        const tasks=await Task.find();
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const getTask=async(req,res)=>{
    try{
        const task=await Task.findById(req.params.id);
        res.status(200).json(task);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const updateTask = async (req, res) => {
    try {
        console.log("Task ID:", req.params.id);
        console.log("Body:", req.body);
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after' }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteTask=async(req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id);
        res.status(200).json(task);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

module.exports={createTask,getTasks,getTask,updateTask,deleteTask};