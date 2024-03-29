//Depends
const { response } = require('express');
const express = require('express');
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

    saveData(data.firstNameS,data.lastNameS,data.companyS, data.email, data.cityS, data.stateS, data.firstNameR, data.lastNameR,data.companyR,data.cityR,data.stateR);
    sendEmail(data.email)

    if (data.stateS == data.stateR) {
        switch (data.stateS) {
            case 'AR':
                    response.render('ansYesAR');
                    break;
            case 'AZ':
                response.render('ansYesAZ');
                break;
            case 'CA':
                response.render('ansYesCA');
                    break;
            case 'CO':
                response.render('ansYesCO');
                    break;
            case 'CT':
                response.render('ansYesCT');
                    break;
            case 'DE':
                response.render('ansYesDE');
                    break;
            case 'DC':
                response.render('ansYesDC');
                    break;
            case 'FL':
                response.render('ansYesFL');
                    break;
            case 'HI':
                response.render('ansYesHI');
                    break;
            case 'IL':
                response.render('ansYesIL');
                    break;
            case 'LA':
                response.render('ansYesLA');
                    break;
            case 'ME':
                response.render('ansYesME');
                    break;
            case 'MD':
                response.render('ansYesMD');
                    break;
            case 'MN':
                response.render('ansYesMN');
                    break;
            case 'MO':
                response.render('ansYesMO');
                    break;
            case 'MT':
                response.render('ansYesMT');
                break;
            case 'NH':
                response.render('ansYesNH');
                    break;
            case 'NJ':
                response.render('ansYesNJ');
                    break;
            case 'NM':
                response.render('ansYesNM');
                    break;
            case 'NY':
                response.render('ansYesNY');
                    break;
            case 'ND':
                response.render('ansYesND');
                    break;
            case 'OH':
                response.render('ansYesOH');
                    break;
            case 'OK':
                response.render('ansYesOK');
                    break;
            case 'OR':
                response.render('ansYesOR');
                    break;
            case 'PA':
                response.render('ansYesPA');
                    break;
            case 'RI':
                response.render('ansYesRI');
                    break;
            case 'UT':
                response.render('ansYesUT');
                    break;
            case 'VT':
                response.render('ansYesVT');
                    break;
            case 'VA':
                response.render('ansYesVA');
                    break;
            case 'WA':
                response.render('ansYesWA');
                    break;
            case 'WV':
                response.render('ansYesWV');
                    break;

            default:
                break;
        }
        
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

function sendEmail(recp){
    //Send email
   
    const output=`
    <html><head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    
                    
                    <style>
                        .forward-text-show {
                            display: block !important;
                            color: #222222 !important;
                            text-align: center!important; 
                            font-size: 11px!important;
                        }
                        .forward-link-show {
                            display : inline !important;
                            color: #2160d2 !important;
                            text-decoration: underline !important;
                            cursor: none !important;
                        }
                    </style>
                
                </head><body style="margin: 0 !important; padding: 0 !important;">
    <table border="0" width="100%" cellspacing="0" cellpadding="0" bgcolor="#f7f9fc">
    <tbody>
    <tr>
    <td height="30">
    <p><span style="font-size: 18pt;">Thank You for your interest in shipping
    Cannabis. We will keep you posted as the rapidly changing Interstate and
    International Cannabis regulations allow us to serve you.</span></p>
    <p><span style="font-size: 24pt;">CanU.Us&nbsp;</span></p>
    <p><span style="font-size: 24pt;">CanU.World</span></p>
    </td>
    </tr>
    <tr>
    <td align="center"></td>
    </tr>
    <tr>
    <td height="30"></td>
    </tr>
    </tbody>
    </table>
    </body></html>
`;
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        secure: false, 
        auth: {
        user: 'testingnm040821@outlook.com',
        pass: 'Password541'
     }
    });

    const options = {
        from: 'testingnm040821@outlook.com',
        to: recp,
        subject: 'CanU - Interstate Cannabis',
        html: output
    };

    transporter.sendMail(options, (error, info) =>{
        if (error){
            return console.log(error);
        }
    
        console.log('sent!!!');
    });

}//sendEmail