//Depends
const { response } = require('express');
const express = require('express');
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const path = require('path');
const exphbs = require('express-handlebars');
const firebase = require('firebase');

const port = process.env.port || 3000;

//Starting sever
const app = express();
app.listen(port, () => console.log('listening at 3000'));

// //View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded());


//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqILD4QOAPCIsdIV4AQbWhWIyVY-A1VhA",
    authDomain: "canu-mvp-demo-fb.firebaseapp.com",
    databaseURL: "https://canu-mvp-demo-fb-default-rtdb.firebaseio.com/",
    projectId: "canu-mvp-demo-fb",
    storageBucket: "canu-mvp-demo-fb.appspot.com",
    messagingSenderId: "637231814605",
    appId: "1:637231814605:web:a912b9eb6cdbe97aefd684",
    measurementId: "G-3L0YBM3XJ8"
  };
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

//Init firebase collection
const submissions = firebase.database().ref('submissions');


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
    saveData(data.firstNameS,data.lastNameS,data.companyS, data.email, data.cityS, data.stateS, data.firstNameR, data.lastNameR,data.companyR,data.cityR,data.stateR);

    if (data.stateS == data.stateR) {
        response.render('ansYesCA');
    } else {
        response.render('ansNo');
    }
    
})

function saveData(firstNameS,lastNameS,companyS, email, cityS, stateS, firstNameR, lastNameR,companyR,cityR,stateR){
    const newSubmission = submissions.push();
    newSubmission.set({
        sender :{
            fname: firstNameS,
            lname: lastNameS,
            company: companyS,
            emails: email,
            city: cityS,
            state: stateS
        },
        receiver :{
            fname: firstNameR,
            lname: lastNameR,
            company: companyR,
            city: cityR,
            state: stateR
        }
    });
}//sendData