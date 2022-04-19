const express = require('express');
const router = express.Router();
const Teacher = require('../models/teachers.model');
const authenticate = require("../middleware/authenticate");

const authorise = require("../middleware/authorazition");

router.post("/",authenticate,
authorise(["admin"]), async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        res.status(201).send(teacher);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
})


router.get("/", async (req, res) => {
    try {
        const teachers = await Teacher.find().populate("class_id").lean().exec();
        res.status(200).send(teachers);
    }
    catch (err) {
        res.status(500).send(err.message);
        //console.log(err.message);
    }
})



router.get("/sort" , async (req, res) => {
    console.log(req.query);
    try{
        const teachers = await Teacher.find()
        .sort({age:req.query.value})
        .populate("class_id")
        .lean().exec();
        res.status(200).send(teachers);
    }
    catch(err){
        res.status(500).send(err.message);   
    }
})

router.get("/search",async (req, res) => {
    try{
        const teachers = await Teacher.find({name:req.query.value})
        .populate("class_id")
        .lean().exec();
        res.status(200).send(teachers);
        
    }
    catch(err){
        res.status(500).send(err.message);   
    }
})

router.get("/:id", async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id).populate("class_id").lean().exec();
        res.status(200).send(teacher);
    }
    catch (err) {
        //console.log(err.message);
        res.status(500).send(err.message);
    }
})


module.exports = router;