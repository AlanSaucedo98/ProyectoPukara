const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
require('mongoose-type-email');


const ChatbouUsersSchema = new Schema({
    firstName: String,
    city: String,
    country: String,
    dni : [Number],
    emails: [{type: mongoose.SchemaTypes.Email}]

}, {
    timestamps: true
});


module.exports= mongoose.model("chatbotUsers",ChatbouUsersSchema);