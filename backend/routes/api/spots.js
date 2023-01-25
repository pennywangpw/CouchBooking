const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Sequelize = require('sequelize')


//Get all Spots
router.get('/', async (req,res)=>{
    const spots = await Spot.findAll()
    let spotsArray= []
    for(let spot of spots){
        console.log('spot: ', spot)
        const spotJSON = spot.toJSON()

        let reviews = await Review.findAll({
            where:{spotId: spotJSON.id},
            attributes:[[Sequelize.fn('AVG', Sequelize.col('start')),'avRating']]
        })
        spotJSON.avgRating = reviews[0].toJSON()
        spotsArray.push(spotJSON)
    }

    return res.json(spotsArray)
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

//delete a spot
router.delete(':spotId',(req,res)=>{
    res.json("Successfully deleted")
})

module.exports = router;
