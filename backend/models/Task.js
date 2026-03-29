const mongoose=require("mongoose");
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        enum:["High","Medium","Low"],
        default:"Medium"
    },
    dueDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["To Do","In Progress","Review","Done"],
        default:"To Do"
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },
    assignee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    subtasks: [{
        title: String,
        assignee: String,
        status: { type: String, default: 'pending' }
    }],
    dependencies: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    }],
    comments: [{
        author: String,
        text: String,
        timestamp: Date
    }],
    attachments: [{
        name: String,
        size: String,
        url: String
    }],
    logs: [{
        date: Date,
        hours: Number,
        status: { type: String, default: 'Pending' }
    }]
}, {timestamps:true})

module.exports=mongoose.model("Task",taskSchema);