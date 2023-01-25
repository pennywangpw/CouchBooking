const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//Get all Spots
router.get('/', async (req,res)=>{
    console.log(req)
    const spots = await Spot.findAll()
    console.log("spots: ",spots)
    return res.json(spots)
})


module.exports = router;
