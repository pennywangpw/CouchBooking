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
    //get all the columns with associate Authentication
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
    return res.json({"Spots":spotlist})
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
                    model: SpotImage,
                    attributes:["id","url","preview"]
                },{
                    model: User,
                    // as: "Owner",
                    attributes:["id","firstName","lastName"]
                }
            ]
        })

        console.log(spotwithid)

        let spotwithidarr =[]
        if(spotwithid){
        spotwithid.forEach(spot=>{spotwithidarr.push(spot.toJSON())})
        console.log("array 裡面: ",spotwithidarr)

        //numReviews

        spotwithidarr.forEach(spot=>{
            let total =0
            console.log("spot:",spot)
            spot.Reviews.forEach(review=>{
                total += review.stars
            })
            spot.numReviews = spot.Reviews.length
            spot.avgRating = total/spot.Reviews.length
            spot.Owner = spot.User
            // spot.Owner = {

            //     "id":User.id,
            //     "firstName": User.firstName,
            //     "lastName": User.lastName
            // }
            delete spot.Reviews
        })

        return res.json(spotwithidarr)

        }
    } else if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }
})




//4.create a spot

const validateCreate = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isNumeric()
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isNumeric()
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isNumeric()
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];

router.post('/', requireAuth,validateCreate, async (req,res,next)=>{
    const newspot = await Spot.create({
    "address": req.body.address,
    "city": req.body.city,
    "state": req.body.state,
    "country": req.body.country,
    "lat": req.body.lat,
    "lng": req.body.lng,
    "name": req.body.name,
    "description": req.body.description,
    "price": req.body.price
    })
    res.status(201)
    res.json(newspot)

})

//5.Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req,res,next)=>{
    // const url = req.body.url
    // const preview = req.body.preview
    let newImage
    const spotId = req.params.spotId
    const {url,preview}= req.body

    //check if there is an existing spot
    const existingSpot = await Spot.findByPk(spotId)


    if(!existingSpot){

        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)

    }else{

        newImage = await existingSpot.createSpotImage({
           spotId:spotId,
           url,
           preview
        })
        //為什不需要轉換成obj就可以在res.json拿資料?
        // console.log("新增加的:",newImage)
    }

    res.json({
        id: newImage.spotId,
        url: newImage.url,
        preview: newImage.preview
    })
})

//6.Edit a Spot
router.put('/:spotId',requireAuth,validateCreate,async(req,res,next)=>{
    const{address,city,state,country, lat, lng, name, description, price} = req.body
    // console.log("全部的body:",req.body)
    const spotId = req.params.spotId

    //find the existing obj by spotId which needs to be changed
    let updateSpot = await Spot.findByPk(spotId)
    console.log("需要被update:",updateSpot)

    if(!updateSpot){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }else{
        updateSpot.address= address
        updateSpot.city= city
        updateSpot.state= state
        updateSpot.country= country
        updateSpot.lat= lat
        updateSpot.lng= lng
        updateSpot.name= name
        updateSpot.description= description
        updateSpot.price= price

        // updateSpot = req.body
    }

    res.json(updateSpot)
})

//7.delete a spot
router.delete('/:spotId', requireAuth, async (req,res,next)=>{
    const spotId = req.params.spotId
    const userId = req.user.id

    //try to see if spotId obj exsits
    const deletSpot = await Spot.findByPk(spotId)

    if(!deletSpot){

        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)

    }else if(userId !== deletSpot.ownerId){
        const err = new Error("Forbidden")
        err.status = 403
        next(err)
    }else{
        res.json("Successfully deleted")
    }

})

module.exports = router;
