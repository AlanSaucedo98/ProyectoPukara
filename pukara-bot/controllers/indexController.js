const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios")



const chatbotUsers = require("../../Models/chatbotUsers");

module.exports = {
    datos :async(req,res) => {

        await mongoose.connect('mongodb+srv://alansaucedo:proyectopukara@cluster0.rvmng.mongodb.net/chatbotdb?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, (err, res) => {
        if (err) return console.log("Error en la db", err);
        console.log("Base de datos online");
    });

        //res.send("Holaaaaaa!")
         chatbotUsers.find()
         .exec(obtenerUsuarios);
         function  obtenerUsuarios (err,data){
             if(err){
                 console.log(err);
             }
             return res.render("index",{
                 title:"Registro de Usuarios",
                 data:data
             })
         }
        
        
    },
    search: async(req,res)=>{

        await mongoose.connect('mongodb+srv://alansaucedo:proyectopukara@cluster0.rvmng.mongodb.net/chatbotdb?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }, (err, res) => {
            if (err) return console.log("Error en la db", err);
            console.log("Base de datos online");
        });


        if(req.query.search == ""){
            res.redirect('/')
        }

        let buscar = req.query.search

        chatbotUsers.find({firstName:{$regex:'.*'+ buscar + '.*',$options:"i"}})
         .exec(obtenerUsuarios);
         function  obtenerUsuarios (err,data){
             if(err){
                 console.log(err);
             }
             return res.render("userSearch",{
                 title:"Resultados de la busqueda",
                 data:data
             })
         }
    }
    
    
}