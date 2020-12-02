const mongoose = require("mongoose");


//mongodb models

const chatbotUsers = require("../Models/chatbotUsers");

module.exports = {
    all :async(req,res) => {

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
         function  obtenerUsuarios (err,usuarios){
             if(err){
                 console.log(err);
             }
             return res.send(usuarios)
         }
        
        
    }
    
}