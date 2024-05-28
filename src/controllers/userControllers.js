const User = require("../models/userModel")
const { sendVerificationEmail } = require('../services/emailServices');
const {findUserByEmail,
   findUserByToken, 
   findUserById
  } = require('../services/userServices');
const { generateOTP } = require('../utils/randomCodeGenerator');
const { hashPassword } = require('../utils/passwordHelpers');


const createNewUser = async (req, res) => {
    try {
        //pull out new user data from request body
  const {firstName, lastName, email} = req.body;

  const userExist =await findUserByEmail(email);

  
  //check if user with email already exist
  if(userExist){
    if (!userExist.isVerified) {
      //send verification token if user exist but is not verified
      await sendVerificationEmail(userExist.email, userExist.verificationToken);
      return res
      .status(200)
      .json({message: "check your email to complete verification process"});
    }
    //send back error message to client if user already exist
    return res.status(403).json({error: "user with this email already exist"});
  }

  const verificationToken = generateOTP();

//create a new instance of usermodel with user data
  const user = new User({
      firstName,
      lastName,
      email,
      verificationToken});
//use the mongoose.save() method to save the user to the database
      await user.save();
//check if user is not created
      if (!user){
        //send back error message to client if user is not created              
            return res.status(400).json({error: "user not created"});
      }
      await sendVerificationEmail(user.email,user.verificationToken );
    //  send back success response if new user is created on database
      return res.status(201).json({message: "user created successfully"});
    }catch (error) {
        console.log(error)
        //send back error message to client if user is not created or server related errors
        res.status(500).json({error: "internal server error"});
    }
};

const verifyUser = async (req, res) => {
  try {
    //get verificationtoken from request body object
    const { verificationToken } = req.body;

    const userWithTokenExist = await findUserByToken(verificationToken);

    if (!userWithTokenExist) {
      return res.status(404).json({ error: "invalid token" });
    }

    userWithTokenExist.isVerified = true;

    await userWithTokenExist.save();

    return res.status(200).json({
      message: "user is verified successfully",

    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
};

const createNewPassword = async (req, res) => {
  try {
    const { verificationToken, password } = req.body;
    const user = await findUserByToken(verificationToken);

    if(!user) {
      return res
      .status(404)
      .json({ error: "user with this email does not exist" });
    }

    //update user password
    const hashedPassword = hashPassword(password);
    user.password = hashedPassword;
    //remove verification token from user
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    res.status(500).json({ erroe: "Internal Server Error" });
  }
};

const getCurrentUser = async(req, res) => {
   try { const {userId} = req.user
  
  const user = await findUserById(userId);

  if (!user) { return res.status(404).json({ error: "user not found"});
}
return res.status(200).json({ message: "user not found", user});

} catch (error) { 
  res.status(500).json({ error: "Internal Server Error"});

}
};

module.exports = {createNewUser, verifyUser, createNewPassword, getCurrentUser };