const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Sequelize = require('sequelize')


//1.Get all Spots
router.get('/', async(req,res)=>{
    //get all the columns with associate table
    const allspots = await Spot.findAll({
        include:[
            {
                model: Review,
                attributes:["stars"]

            },{
                model: SpotImage,
                attributes:["url","preview"]
            }
        ]
    })

    // console.log(allspots)
    //change promise into json object & save in array
    let allspotsarr =[]

    allspots.forEach(spot=>{allspotsarr.push(spot.toJSON())})
    // console.log("所有的spots:", allspotsarr)

    //nested loop to get each spot > review > stars
    allspotsarr.forEach(spot=>{

        //add avgRating attribute
        if(spot.Reviews.length > 0){
            let total = spot.Reviews.reduce((sum,review)=>{
                return sum += review.stars
            },0)
            // console.log(total)
        spot.avgRating = total/ spot.Reviews.length
        }


        //add previewimage
        spot.SpotImages.forEach(image=>{
            if(image.preview === true) {
                spot.previewImage = image.url
            }
        })

        delete spot.Reviews
        delete spot.SpotImages

    })
    res.json(allspotsarr)
})



//2.Get all spots owned by the current user
router.get('/current', requireAuth, async (req,res)=>{
    // get all the columns
    const spots = await Spot.findAll({
        where:{
            ownerId : req.user.id
        },
        include:[
            {
                model: Review,
                attributes:["stars"]

            },{
                model: SpotImage,
                attributes:["url","preview"]
            }
        ]
    })

    //change into JSON and store into []
    let spotlist = []
    spots.forEach(spot=>{spotlist.push(spot.toJSON())})

    //add avgRating
    spotlist.forEach(spot=>{
        let total =0
        spot.Reviews.forEach(review=>{
            total += review.stars
        })
        spot.avgRating = total/spot.Reviews.length


    //add previewimage
    spot.SpotImages.forEach(image=>{
        if(image.preview === true) {
            spot.previewImage = image.url
        }
    })

    //delete the colums not require
    delete spot.Reviews
    delete spot.SpotImages
    })
    return res.json(spotlist)
})


//3.Get details of a Spot from an id
router.get('/:spotId', async (req,res,next)=>{
    const spotId = req.params.spotId
    console.log("spotId: ", spotId)
    //先找id看存在嗎
    const spot = await Spot.findByPk(spotId)

    //如果存在
    if(spot){
        const spotwithid = await Spot.findAll({
            where: {id: spotId},
            include:[
                {
                    model: Review,
                    attributes:["stars"]

                },{
                    model: SpotImage
                }
            ]
        })

        console.log(spotwithid)

        let spotwithidarr =[]
        if(spotwithid.length > 0){

        spotwithid.forEach(spot=>{spotwithidarr.push(spot.toJSON())})
        console.log("array 裡面: ",spotwithidarr)
        return res.json(spotwithidarr)

        }
    } else if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }

    // return res.json("test")
})




// //4.create a spot
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
