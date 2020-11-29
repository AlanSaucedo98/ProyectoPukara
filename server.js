const express = require ("express");
const app = express();
const mongoose = require("mongoose");


//Middelware para tranformar el formato de la informacion recibida 
app.use(express.json());


 mongoose.connect('mongodb+srv://alansaucedo:proyectopukara@cluster0.rvmng.mongodb.net/chatbotdb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},(err,res) => {
    if(err) return console.log("Error en la db",err);
    console.log("Base de datos online");
}
);

//Creo ruta  via post para la visualizacion de los datos de DialogFlow
app.post("/",(req,res) => {

    const {} = req.body.queryResult.parameters

    //console.log(req.body.queryResult); Linea para ver datos recibidos.
    res.json({
        fulFillmentMessages :"El usuario registradp es "
    })


})

app.listen(3000)