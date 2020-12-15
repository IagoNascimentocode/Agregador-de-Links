/* Cria o modelo de dado que vai ser inserio no Mongoose */
const mongoose = require('mongoose');
const linksSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description:String,
    url:{type:String, required:true},
    clicks:{type:Number, default:0}
});

module.exports = mongoose.model('LinkModel',linksSchema);