const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
require('mongoose-type-email');


const ChatbotUsersSchema = new Schema({
    firstName: String,
    city: String,
    country: String,
    dni : [Number],
    emails: [{type: mongoose.SchemaTypes.Email}],
    session: String
}, {
    timestamps: true
});


module.exports= mongoose.model("chatbotUsers",ChatbotUsersSchema);