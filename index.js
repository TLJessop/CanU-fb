//Depends
const { response } = require('express');
const express = require('express');
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const path = require('path');
const exphbs = require('express-handlebars');

const port = process.env.port || 3000;

//Starting sever
const app = express();
app.listen(port, () => console.log('listening at 3000'));

// //View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded());


//Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));


//init routes
app.locals.layout = false; 
app.get('/', (request, responce)=>{
    responce.render('index');
});

app.post('/send', (request, response) =>{
    const data = request.body;

    console.log(data);

    if (data.stateS == data.stateR) {
        response.render('ansYesCA');
    } else {
        response.render('ansNo');
    }
    
})