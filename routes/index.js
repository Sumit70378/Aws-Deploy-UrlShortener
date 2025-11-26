const express = require('express')
const {handleGenerateShortUrl, handleGetShortUrl} = require("../controller/index")
const router = express.Router();

router.post('/',handleGenerateShortUrl)




module.exports =router