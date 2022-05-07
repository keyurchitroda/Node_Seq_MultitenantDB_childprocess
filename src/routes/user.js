const express = require('express')
const router = express.Router()
const userController = require("../controller/user")
const requireLogin = require("../middleware/verifytoken")

router.post("/createuser",userController.createUserAccount)
router.get("/getuser",userController.getUser)
router.post("/login",userController.login)
router.get("/demo",requireLogin,userController.getDAta)


module.exports = router

