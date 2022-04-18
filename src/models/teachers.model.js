const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: false},
    gender: {type: String, required: true},
    age: {type:Number, required: true},
    class_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
},{
    timestamps:true,
    versionKey:false
});

module.exports = mongoose.model("teacher",teacherSchema)