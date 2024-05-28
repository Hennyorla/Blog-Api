const express = require('express');
const { loginUser , 
    logOutUser,
generateNewAccessToken,
} = require("../controllers/authControllers");
const { requireSignin } = require("../middlewares/requireSignin")
const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", requireSignin, logOutUser);
router.get("/refresh-token", generateNewAccessToken),

module.exports = router;
