const sgMail = require('@sendgrid/mail');
 
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "ritwikneema16@protonmail.com",
        subject: "Welcome to the Task Manager App",
        text: `Hey there, ${name}. Thanks for signing up!` 
    }).then(response => console.log("Sent!", response))
    .catch(err => console.log("Couldn't send", err));
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email, 
        from: "ritwikneema16@protonmail.com",
        subject: "Where did we go wrong?",
        text: `Hey ${name}. We're sorry to see you go. Please take a moment of your time and tell us where did we go wrong?`
    }).then(response => console.log("Sent!", response))
    .catch(err => console.log("Couldn't send", err));
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};