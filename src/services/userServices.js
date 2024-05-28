const User = require("../models/userModel");

const findUserByEmail = async (email) => {
    const user = await User.findOne({ email });

    return user;

};

const findUserByToken = async (token) => {
    const user = await User.findOne({ verificationToken: token });

    return user;
};

const findUserById = async (userId) => {
    const user =await User.findById(userId)
    .select("-password")
    .select("-verificationTokenExpiresIn");

    return user;
};

module.exports = { findUserByEmail, findUserByToken, findUserById };