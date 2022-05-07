const express = require('express')
const router = express.Router()
const accoutRoutes = require("./account")
const userRoutes = require("./user")


router.use("/account",accoutRoutes)
router.use("/user",userRoutes)

module.exports = router