const express = require("express")
const { getPersonas } = require("../controllers/getPersonas")
const router = express.Router()

router.get("/", getPersonas);

module.exports = router