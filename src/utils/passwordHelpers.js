const bcrypt = require('bcryptjs');

const hashPassword =(plaintextPassword) => {
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(plaintextPassword, salt);

    return hashedPassword;
};

const verifyPassword = (userpassword, providePassword) => {
    return bcrypt.compareSync(providePassword, userpassword);
};

module.exports = { hashPassword, verifyPassword };