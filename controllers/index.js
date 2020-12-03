const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios")


module.exports ={
    dashboard : (req,res)=>{
        res.render("index",{})
    }



}