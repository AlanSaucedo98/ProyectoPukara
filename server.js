const express = require("express");
const app = express();
const mongoose = require("mongoose");

//mongodb models

const chatbotUsers = require("./Models/chatbotUsers");



// chatbotUsers.find({},(err,res)=>{
//     console.log(res);
// });




//Middelware para tranformar el formato de la informacion recibida 
app.use(express.json());

//Creo ruta  via post para la visualizacion de los datos de DialogFlow
app.post("/",async (req, res) => {

    mongoose.connect('mongodb+srv://alansaucedo:proyectopukara@cluster0.rvmng.mongodb.net/chatbotdb?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, (err, res) => {
        if (err) return console.log("Error en la db", err);
        console.log("Base de datos online");
    });



    const action = req.body.queryResult.action


    switch (action) {
        case "input.welcome":
            res.json({
                fulfillmentText: `Bienvenidos,Obtenga información al dia sobre la cotización de Bitcoin, Ethereum y Monero en pesos argentinos.Si ya posee una cuenta escriba "Login" de lo contrario ingrese "Register"`
            })
            break;
        case "register":

            const {
                nombre, ciudad, country, dni, email
            } = req.body.queryResult.parameters

            //console.log(req.body); //Linea para ver datos recibidos.
            saveUserData(nombre,ciudad,country,dni,email);

            res.json({
                fulfillmentText: `Bienvenido ${nombre} .Sus datos son :
                nombre: ${nombre},ciudad : ${ciudad},country: ${country},DNI : ${dni},email : ${email}`
            })
            function saveUserData (nombre,ciudad,country,dni,email){
                let ChatbotUser = new chatbotUsers({
                    firstName: nombre,
                    city: ciudad,
                    country: country,
                    dni : dni,
                    emails: email

                });
                 ChatbotUser.save((err,res)=>{
                    if(err) return console.log(err);
                    console.log("Se creo un usuario:",res);
                })
            }

            break;
            case "Login":

            





            break;
        default:
            res.json({
                fulfillmentText: "No entiendo nada"
            })
            break;
    }




})

app.listen(3000)