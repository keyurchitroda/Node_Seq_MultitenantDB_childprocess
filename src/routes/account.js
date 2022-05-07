const express = require('express')
const router = express.Router()
const accController = require("../controller/account")

router.post("/create",accController.createAccount)
router.get("/get",accController.getAccount)

module.exports = router

