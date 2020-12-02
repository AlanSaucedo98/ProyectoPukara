const mongoose = require("mongoose");


//mongodb models

const chatbotUsers = require("../controllers/usersController");

module.exports = {
    all :async(req,res) => {

        //res.send("Holaaaaaa!")
        const users = await chatbotUsers.find({});
        res.send(users)
        
    }
    
}