const { USER_EMAIL } = require('../config/index');
const transport = require('../utils/smtpTransport');


/**
 * @description sendVerificationEmail
 * @param {email}
 * @param {token}
 */
const sendVerificationEmail = async (email, token) => {
    const mailOptions = {
        to: email,
        from: USER_EMAIL,
        subject: 'Welcome to Wookup!',
        html: `<div><p> Dear <strong>Valid user</strong> </p>
        <h4> You are a step closer !!! </h4>
        <p> Use the token below to verify your account</p>
        <h1> ${token} </h1>
        <p>Thanks </p>.
         <div>`
    };

    transport
    .sendMail(mailOptions)
    .then(() => {
        message: "email sent successfully";
    })
    .catch(() => {
        error: "something went wrong";
    });
};

module.exports = { sendVerificationEmail };