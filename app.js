const port = 3000;
const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const linkRoute = require('./routes/linkRoutes')


mongoose.connect('mongodb://localhost/newlinks',
{
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

let db = mongoose.connection;

 

db.on("error", ()=>{console.log("houve um Erro!")})
db.once("open", ()=>{console.log("Banco de dados carregado.")})


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'templates'))

app.use('/',linkRoute);
app.listen(port,()=>{
    console.log(`Server run port:${port}`)
})
/* let linkModel = new LinkModel({
    title:"IagoNascimento",
    description:"Meu Twitter",
    url:"http://twitter.com/IagoNascimento",
}) */
 /*    -- Salva o arquivo dentro do banco de dados --  */
/*   linkModel.save().then(documento=>{
    console.log(documento);
}).catch(error =>{
    console.log(error)
}) 
 */