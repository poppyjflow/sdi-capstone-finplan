const {getRequest, getWithID, deleteRequest, getID} = require('./queryHelpers.js')
const express = require("express");
const nodemailer = require("nodemailer");
const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]

const knex = require('knex')(config)
const app = express();
const port = 5555;


app.use(express.json());

//periodic  email knex and sent;
function periodicRequest() {
    setInterval( async function() {
        let selectedInfo = [];

         await knex('users')
            .select('id','email','org')
            // .where('id','=','1')
            .then(info => {
                console.log(info)
                return info
            })
            .then(info => selectedInfo = info)
            .catch(err =>console.log(err))
        
        for (let user of selectedInfo){
            // console.log("setting options")
            let option = mailOptionSetter(user.email)

            // console.log('sending email')
            sendMail(option)
        }
        
    }, 30000); //5 sec
  }

// execute the function 
periodicRequest();

// authication to transport to the mailtrap io
let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "37115e15387fa4",
        pass: "701762a8ca2d3d"
    }
});

// set text and email address
function mailOptionSetter(endUserEmail) {
    let mailOptions = {
        from: '"System Admin" <from@example.com>',
        to: `${endUserEmail}`,
        subject: 'reminder',
        text: 'Hello, please check your budget request 😉 ',
        html: '<b>Hey Hello! </b><br> please check your budget request 😉'
    };
    return mailOptions
}

// sent the mail 
function sendMail(options){
    transporter.sendMail(options, (error, info) => {
        // console.log(error)
        if (error) {
            // res.status(400).json("error: ",`${error}`)
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId)
        // res.status(200).json(`${info.messageId}`);
    })

}

//sent the mail with respond to the backend
function sendMailInstant(options,res){
    transporter.sendMail(options, (error, info) => {
        // console.log(error)
        if (error) {
            res.status(400).json("error: ",`${error}`)
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId)
        return res.status(200).json(`${info.messageId}`);
    })

}

// send "instant" email endpoint 
app.post('/sendemail', (req, res) => {
    const emailEndUser = req.body.endUserEmail;
    console.log(emailEndUser);
    let options = mailOptionSetter(emailEndUser);
    console.log(options);
    sendMailInstant(options,res);
});




app.listen(port, () => {
 console.log(`Server is running on port: ${port}`);
});