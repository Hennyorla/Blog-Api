const express =require('express');
const router = express.Router();
const {
     createNewUser, 
     verifyUser, 
     createNewPassword,
    getCurrentUser
    
 } = require('../controllers/userControllers');
 const { requireSignin } = require("../middlewares/requireSignin");

 const {
    checkUserData,
    checkPasswordValidity,
 } = require("../middlewares/dataValidator")

router .post('/', checkUserData, createNewUser );
router.put("/verify", verifyUser);
router.put("/update-password", checkPasswordValidity, createNewPassword );
router.get("/me", requireSignin, getCurrentUser);

module.exports = router;