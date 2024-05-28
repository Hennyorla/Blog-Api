const mongoose = require('mongoose');
const { DB_URI } = require('../config/index');

/**
 * @description database connection configuration
 */


const dbconnect = async () => {
    await mongoose
    .connect(DB_URI)
    .then(() => 
        console.log('Database connected successfully'))
    .catch((error) => console.log(error));
};
    module.exports = dbconnect;