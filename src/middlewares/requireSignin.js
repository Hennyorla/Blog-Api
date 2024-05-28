const { ACCESS_TOKEN_SECRET } = require('../config');
const { verifyToken } = require('../utils/jwtHelpers');     

const requireSignin = (req, res, next) => {
   try{
    // destructure access token from req.cookies object
    const { accessToken } = req.cookies;

//return 401 error if cookie is not provided by the client
    if (!accessToken) {
        return res.status(401).json({ error: 'Access denied' });
   }
   //verift token with verifyToken helpers function using the access token and access token secret
    const payLoad = verifyToken(accessToken, ACCESS_TOKEN_SECRET);
    //if payload is not returned from the verifyToken function,return 403 error
 if (!payLoad) {
        return res.status(403).json({ error: 'invalid token' });

    }

    //append payload to api req(request) object
    req.user = payLoad;

    //call the next function to move forward
    next();

} catch (error) {
        //handle any error returned from jwt verify method
        return res.status(403).json({ error: 'invalid token' });
    }
};

module.exports = { requireSignin };