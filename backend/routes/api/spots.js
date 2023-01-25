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
            attributes:[[Sequelize.fn('AVG', Sequelize.col('stars')),'avRating']]
        })
        spotJSON.avgRating = reviews[0].toJSON().avgRating
        spotsArray.push(spotJSON)
    }

    // const returnSpotId = {
    //     "ownerId":req.user.id,
    //     "address": spotId.address,
    //     "city":spotId.city,
    //     "state":spotId.state,
    //     "country":spotId.country,
    //     "lat":spotId.lat,
    //     "lng":spotId.lng,
    //     "name":spotId.name,
    //     "description":spotId.description,
    //     "price":spotId.price
    // }

    return res.json({Sport: spotsArray})
})


//Get all spots owned by the current user
router.get('/current', requireAuth, async (req,res)=>{
    console.log("penny test:", req)
    const spots = await Spot.findAll({
        where:{
            ownerId : req.user.id
        }
    })
    return res.json(spots)
})


//Get details of a Spot from an id
router.get('/:spotId', async (req,res)=>{
    const allspots = await Spot.findAll()
    console.log(allspots)
})

//delete a spot
router.delete(':spotId',(req,res)=>{
    res.json("Successfully deleted")
})

module.exports = router;
