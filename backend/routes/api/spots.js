const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');


//Get all Spots
router.get('/', async (req,res)=>{
    console.log(req)
    const spots = await Spot.findAll()
    console.log("spots: ",spots)
    return res.json(spots)
})


//Get all spots owned by the current user
router.get('/current', async (req,res)=>{
    console.log(req)
    requireAuth
    const spots = await Spot.findAll({
        // where:{
        //     ownerId :{req.params.current}
        // }
    })
    return res.json(spots)
})

module.exports = router;
