const dotenv = require('dotenv');
dotenv.config();
/**
 * @description This file is used to store all environment variables
 */

// Exporting the configuration
module.exports = {
    //central point for all environment variables
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    CLIENT_ID: process.env.EMAIL_CLIENT_ID,
    CLIENT_SECRET: process.env.EMAIL_CLIENT_SECRET,
    ACCESS_TOKEN: process.env.EMAIL_ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.EMAIL_REFRESH_TOKEN,
    USER_EMAIL: process.env.SMTP_USER_EMAIL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};