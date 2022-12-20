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
            .innerJoin('notifications', 'users.org', '=', 'notifications.org_id')

            .select('users.id','users.email','users.org','users.f_name','users.l_name','notifications.due_date')
            .then(info => {
                console.log(info)
                return info
            })
            .then(info => selectedInfo = info)
            .catch(err =>console.log(err))
        
        for (let user of selectedInfo){
            console.log("setting options")
            let option = mailOptionSetter(user.email, user.f_name, user.l_name, user.due_date)

            console.log('sending email')
            sendMail(option)
        }
        
    }, 30000); //30 sec
  }

// execute the function 
periodicRequest();

// authication to transport to the mailtrap io
let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "b082f876051d90",
        pass: "9b4c6c4c265a5e"
    }
});

// set text and email address
function mailOptionSetter(endUserEmail,endUserFirstName, endUserLastName, dueDate) {
    let mailOptions = {
        from: '"System Admin" <from@admin.com>',
        to: `${endUserEmail}`,
        subject: 'reminder',
        text: `Hello ${endUserFirstName}, please check your budget request 😉 `,
        html: `<b> Hello ${endUserFirstName} ${endUserLastName}! </b><br> Just sending a friendly reminder regarding the upcoming budget request which is due ${dueDate} 😉`
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