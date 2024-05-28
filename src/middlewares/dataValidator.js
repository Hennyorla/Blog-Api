const checkUserData = async(req, res, next) => {
    const { email, firstName, lastName } = req.body;

    if (!email || !firstName ||!lastName) {
        return res.status(403).json({ error: "all input fields are required"});
    }

    if (!email.includes("@")) {
        return res.status(403).json({ error: "Invalid email address"});
    }

    next();
};

const checkPasswordValidity = async (req, res, next) => {
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
        return res.status(403).json({ error: "all input fields are required"});
    }
    if (password !==confirmPassword) {
        return res.status(403).json ({ error: "password does not match" });
    }
    if (password.length < 8) {
        return res
        .status(403)
        .json({ error: "password must be at least 8 characters"});
    }

    next();
 };


 module.exports = { checkUserData, checkPasswordValidity };