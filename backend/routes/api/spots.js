const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Sequelize = require('sequelize')


//Get all Spots
router.get('/', async(req,res)=>{
    //get all the columns with associate talbe
    const allspots = await Spot.findAll({
        include:[
            {model: Review},{model: SpotImage}
        ]
    })
    console.log(allspots)
})


// //solution1
// router.get('/', async (req,res)=>{
//     const spots = await Spot.findAll()
//     let spotsArray= []
//     for(let spot of spots){
//         console.log('spot: ', spot)
//         const spotJSON = spot.toJSON()

//         let reviews = await Review.findAll({
//             where:{spotId: spotJSON.id},
//             attributes:[[Sequelize.fn('AVG', Sequelize.col('stars')),'avRating']]
//         })
//         spotJSON.avgRating = reviews[0].toJSON().avgRating
//         spotsArray.push(spotJSON)
//     }

//     return res.json({Sport: spotsArray})
// })


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


// //Get details of a Spot from an id
// router.get('/:spotId', async (req,res)=>{
//     const allspots = await Spot.findAll()
//     console.log(allspots)
// })

//create a spot
// router.post('/', requireAuth, async (req,res)=>{
//     "address": req.body.address,
//     "city": "San Francisco",
//     "state": "California",
//     "country": "United States of America",
//     "lat": 37.7645358,
//     "lng": -122.4730327,
//     "name": "App Academy",
//     "description": "Place where web developers are created",
//     "price": 123
// })

//delete a spot
router.delete(':spotId',(req,res)=>{
    res.json("Successfully deleted")
})

module.exports = router;
