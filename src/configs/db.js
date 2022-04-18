const mongoose = require("mongoose");

const connect = ()=>{
    mongoose.connect("mongodb+srv://school:school@cluster0.fprdx.mongodb.net/school_model");
}

module.exports =connect;