//Firebase configuration
  var firebaseConfig = {
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


// listen for form submit
document.getElementById('shipInfo').addEventListener('submit', subForm);

function subForm(e){
    e.preventDefault();

    //Get values
    const firstNameS = document.getElementById('firstNameS').value;
    const lastNameS = document.getElementById('lastNameS').value;
    const companyS = document.getElementById('companyS').value;
    const email = document.getElementById('email').value;
    const cityS = document.getElementById('cityS').value;
    const stateS = document.getElementById('stateS').value;

    const firstNameR = document.getElementById('firstNameR').value;
    const lastNameR = document.getElementById('lastNameR').value;
    const companyR = document.getElementById('companyR').value;
    const cityR = document.getElementById('cityR').value;
    const stateR = document.getElementById('stateR').value;
  
    saveData(firstNameS,lastNameS,companyS,email,cityS,stateS,firstNameR,lastNameR,companyR,cityR,stateR);
    //Show Anwser
    if (stateS === stateR) {
        document.querySelector('.ansYes').style.display = 'block';
    } else {
        document.querySelector('.ansNo').style.display = 'block';
    }


    document.querySelector('.shipForm').style.display = 'none';

}//subForm

//Send Data to 
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