const express = require("express");
const app = express();
const mongoose = require("mongoose");


//mongodb models

const chatbotUsers = require("./Models/chatbotUsers");

//Controlladores
var userApiRouter = require('./controllers/usersController')

  




//Middelware para tranformar el formato de la informacion recibida 
app.use(express.json());

//Creo ruta  via post para la visualizacion de los datos de DialogFlow
app.post("/",async (req, res) => {

    await mongoose.connect('mongodb+srv://alansaucedo:proyectopukara@cluster0.rvmng.mongodb.net/chatbotdb?retryWrites=true&w=majority', {
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
                fulfillmentText: `Sus datos son :
                nombre: ${nombre},ciudad : ${ciudad},country: ${country},DNI : ${dni},email : ${email}.Si los datos son correcto escriba "Si" de lo contrario ingrese "No"`
            })
            async function saveUserData (nombre,ciudad,country,dni,email){
                let isRegistered = await chatbotUsers.findOne({emails:email});
                if (isRegistered) return;
                

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
        
    }

    if(action == "login"){

            const {email} = req.body.queryResult.parameters

            console.log(req.body);

            login(email)

            async function login (email){

                let isRegistered = await chatbotUsers.findOne({emails:email});
                if (isRegistered) 
                    res.json({
                        fulfillmentText: "Sesion Iniciada Correctamente . Ingrese el numero de la opcion por la cual desea obtener informacion : 1-Bitcoin  , 2:Ethereum  ,3- Monero "
                    })
                if(!isRegistered)
                res.json({
                    fulfillmentText: "No se encontro una cuenta asosiada a ese email "
                })

            }

        }


})

app.use('/api',userApiRouter.all)
app.listen(3000)