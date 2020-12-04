const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios")


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


    let sesionUser = ""
    let usuario = ""

    switch (action) {
        case "input.welcome":

        sesionUser = req.body.session// Capturo la session del dispositivo para pre-vincular al usuario.

        usuario = await chatbotUsers.findOne({
            session : sesionUser
        })

            console.log(usuario);//Para visualizar el usuario obtenido por su session.
            //console.log(req.body.session)//PAra visualizar los datos recibidos por el body.

            if (usuario != null ) {
                res.json({
                    fulfillmentText: `
                    Bienvenido ${usuario.firstName}!
¡Por favor indique de que criptomoneda desea saber la cotizacion(Puede hacerlo clickeando la opcion deseada) !
 1- /Bitcoin
 2- /Ethereum 
 3- /Monero
 4- /Todas`
                });
            } else {
                res.json({
                    fulfillmentText: `No se encuentra registrado, para acceder a nuestro servicio debe registrarse.
                                    ¿Si desea registrarse haga click en el siguiente enlace "/registrarse"? `
                });
            }
            
            break;
        case "register":

            const {
                nombre, ciudad, country, dni, email
            } = req.body.queryResult.parameters

            const{session } = req.body.session
            console.log(req.body); //Linea para ver datos recibidos.


            saveUserData(nombre,ciudad,country,dni,email,session);

            res.json({
                fulfillmentText: `Sus datos son :
                nombre: ${nombre},ciudad : ${ciudad},country: ${country},DNI : ${dni},email : ${email}.
Desea guardar confirmar su usuario?/si`
            })


            async function saveUserData (nombre,ciudad,country,dni,email){
                let isRegistered = await chatbotUsers.findOne({emails:email});
                if (isRegistered) return;
                

                let ChatbotUser = new chatbotUsers({
                    firstName: nombre,
                    city: ciudad,
                    country: country,
                    dni : dni,
                    emails: email,
                    session : req.body.session
                });
                 ChatbotUser.save((err,res)=>{
                    if(err) return console.log(err);
                    console.log("Se creo un usuario:",res);
                })
            }

            
            break;

            case "register.registro-yes":

                
            
            res.json({
                fulfillmentText: `Guardado con exito!!
Por favor indique que cotización de criptomoneda desea saber:
                    1- Bitcoin
                    2- Ethereum 
                    3- Monero
                    4- Todas`
            });

            break;
            case "register.registro-no":
                
                let sessionElim = req.body.session

            elimUserData(sessionElim);

                
                async function elimUserData (sessionElim){
                    let isRegistered = await chatbotUsers.deleteOne({ session: sessionElim });
                    if (isRegistered) return;
                    
    
                    
                     ChatbotUser.save((err,res)=>{
                        if(err) return console.log(err);
                        console.log("Se creo un usuario:",res);
                    })
                }
            
            
            res.json({
                fulfillmentText: `Sus datos NO se guardaron !! Si deasea realizar otra consulta escribanos nuevamente con el comando /hola.Gracias por su tiempo !`
            });

            console.log(req.body);

            break;
            case "bitcoin":
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=ars`).then(respuesta => {
                res.json({
                    fulfillmentText: `El valor actual de Bitcoint en pesos Argentinos es de $ ${respuesta.data.bitcoin.ars}!`
                })
            });
            break;
            case "ethereum":
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=ars`).then(respuesta => {
                res.json({
                    fulfillmentText: `El valor actual de Ethereum en pesos Argentinos es de $ ${respuesta.data.ethereum.ars}!`
                })
            });
            break;

        case "monero":
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=ars`).then(respuesta => {
                res.json({
                    fulfillmentText: `El valor actual de Monero en pesos Argentinos es de $ ${respuesta.data.monero.ars}!`
                })
            });
            break;
            default:
            res.json({
                fulfillmentText: "Lo siento ,no comprendo su consulta.Por Favor intentelo nuevamente "
            });
            break
        
    }

    

})

app.get('/api',async (req,res)=>{

    await mongoose.connect('mongodb+srv://alansaucedo:proyectopukara@cluster0.rvmng.mongodb.net/chatbotdb?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, (err, res) => {
        if (err) return console.log("Error en la db", err);
        console.log("Base de datos online");
    });

    const usuarios = await chatbotUsers.find({});
    console.log(usuarios);
    res.send({
        usuarios: usuarios
    });

})


app.listen(8080)