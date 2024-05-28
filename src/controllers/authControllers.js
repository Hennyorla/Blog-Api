const { findUserByEmail } = require("../services/userServices");
const { verifyPassword } = require('../utils/passwordHelpers');
const { generateToken, verifyToken } = require('../utils/jwtHelpers');
const {ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET} = require('../config/index');

const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;
        //verify if user with email exist on database
        const userExist = await findUserByEmail(email);

        if (!userExist) {
            return res.status(404).json({error: "user with this email does not exist"});
        }
        // check if user is not verified
        if (!userExist.isVerified) {
            return res.status(403).json({error: "user not verified, check your email to complete verification process"});
        }

        //verify if password match with user password i.e correct password
        const passwordMatch = verifyPassword(userExist.password, password);

        if(!passwordMatch) {
            return res.status(403).json({ error: "invalid Login Credentials"})
        }
        //generate refresh and access token
        const userData = {userId: userExist._id, email: userExist.email};
        const accessToken = generateToken(userData, "1h",ACCESS_TOKEN_SECRET);
        const refreshToken = generateToken(userData, "24h", REFRESH_TOKEN_SECRET);

        //send back success response with access and refresh token
        const cookieOptions = {
            expires: new Date() + 60 * 60 * 1000,
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        };

        return res
        .cookie("accessToken", accessToken, cookieOptions)
        .json({
            message: "user logged in successful",refreshToken 
        });
    }catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"});
    }
};

const logOutUser = async(req, res) => {

    try{
        const cookieOptions = {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        };

        return res
        .clearCookie("accessToken", cookieOptions)
        .json({ message: "logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"})
    }
};

const generateNewAccessToken = async  (req, res) => {
    try{
        // get auth headers from reg.headers

        const headers = req.headers["authorization"];

  // check if refresh token is valid
  if (headers.split(" ")[0] !== "Bearer") {
      return res.status(403).json({ error: "invalid token"});
    }
    //get the refresh token
    const refreshToken = headers.split(" ")[1];

    //verify the refresh token
    const payload = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);

    const userData = {
        userId: payload.userId,
         email: payload.email,
        };
        //generate new access token
        const accessToken = generateToken(userData, "1h", ACCESS_TOKEN_SECRET);

        if (!accessToken) {
            return res.status(403).json({error: "Token Generation Failed"});
        }
        // send back success response with new access token
        //also save access token to browser cookie storage

        const cookieOptions = {
            expires: new Date() + 60 * 60 * 1000,
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            secure: true,
        };
        return res 
        .cookie("accessToken", accessToken, cookieOptions)
        .json({ message: "new access token generated successfully"});
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error"});
        }
    };
    



module.exports = { loginUser, logOutUser, generateNewAccessToken};