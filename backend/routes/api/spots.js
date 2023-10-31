const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Sequelize = require('sequelize')


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


const validateCreateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isNumeric()
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];




//check if spotId exists
const existingSpot = async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
        // const err = new Error("Spot couldn't be found")
        // err.status = 404
        // next(err)
    }
    return next()
}

//check if current user is the owner of the spot
const existingOwner = async (req, res, next) => {
    const userId = req.user.id
    const spot = await Spot.findByPk(req.params.spotId)

    if (userId !== spot.ownerId) {
        return res.status(403).json({
            "message": "Spot must belong to the current user",
            "statusCode": 403
        })
    }
    return next()
}

//1.Get all Spots
router.get('/', async (req, res) => {
    //12. Add Query Filters to Get All Spots
    let { page, size } = req.query
    let pagination = {}
    let where = {}
    page = parseInt(page)
    size = parseInt(size)

    const err = {
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {}
    }

    if (page === 0) err.errors.page = "Page must e greater than or equal to 1"
    if (size === 0) err.errors.size = "Size must be greater than or equal to 1 "

    if (isNaN(page)) page = 1
    if (isNaN(size)) size = 20

    if (page >= 1 && size >= 1) {
        if (size >= 20) {
            pagination.limit = 20
        } else {
            pagination.limit = size
            pagination.offset = size * (page - 1)
        }
    }


    //get all the columns with associate Authentication
    const spot = await Spot.findAll({
        where,
        ...pagination
    })

    if (page === 0 || size === 0) {
        return res.status(400).json(err)
    }




    // return res.json({ Spots: spot, page, size});




    const allspots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: ["stars"]

            }, {
                model: SpotImage,
                attributes: ["url", "preview"]
            }
        ]
    })


    //change promise into json object & save in array
    let allspotsarr = []

    allspots.forEach(spot => { allspotsarr.push(spot.toJSON()) })


    //nested loop to get each spot > review > stars
    allspotsarr.forEach(spot => {

        //add avgRating attribute
        if (spot.Reviews.length > 0) {
            let total = spot.Reviews.reduce((sum, review) => {
                return sum += review.stars
            }, 0)
            spot.avgRating = total / spot.Reviews.length
        }


        //add previewimage
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        })

        delete spot.Reviews
        delete spot.SpotImages

    })

    // return res.json({ Spots: spot, page, size});
    return res.json({ "Spots": allspotsarr, page, size })
})



//2.Get all spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
    // get all the columns
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {
                model: Review,
                attributes: ["stars"]

            }, {
                model: SpotImage,
                attributes: ["url", "preview"]
            }
        ]
    })

    //change into JSON and store into []
    let spotlist = []
    spots.forEach(spot => { spotlist.push(spot.toJSON()) })

    //add avgRating
    spotlist.forEach(spot => {
        let total = 0
        spot.Reviews.forEach(review => {
            total += review.stars
        })
        spot.avgRating = total / spot.Reviews.length


        //add previewimage
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        })

        //delete the colums not require
        delete spot.Reviews
        delete spot.SpotImages
    })
    return res.json({ "Spots": spotlist })
})


//3.Get details of a Spot from an id
router.get('/:spotId', existingSpot, async (req, res, next) => {
    const spotId = req.params.spotId

    //如果存在
    const spotwithid = await Spot.findAll({
        where: { id: spotId },
        include: [
            {
                model: Review,
                attributes: ["stars"]

            }, {
                model: SpotImage,
                attributes: ["id", "url", "preview"]
            }, {
                model: User,
                // as: "Owner",
                attributes: ["id", "firstName", "lastName"]
            }
        ]
    })


    let spotwithidarr = []
    if (spotwithid) {
        spotwithid.forEach(spot => { spotwithidarr.push(spot.toJSON()) })


        //numReviews

        spotwithidarr.forEach(spot => {
            let total = 0
            spot.Reviews.forEach(review => {
                total += review.stars
            })
            spot.numReviews = spot.Reviews.length
            spot.avgRating = total / spot.Reviews.length
            spot.Owner = spot.User
            // spot.Owner = {

            //     "id":User.id,
            //     "firstName": User.firstName,
            //     "lastName": User.lastName
            // }
            delete spot.Reviews
            delete spot.User
        })

        return res.json(spotwithidarr)

    }

})




//4.create a spot
router.post('/', requireAuth, validateCreate, async (req, res, next) => {
    const newspot = await Spot.create({
        "ownerId": req.user.id,
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
router.post('/:spotId/images', requireAuth, existingSpot, existingOwner, async (req, res, next) => {
    // const url = req.body.url
    // const preview = req.body.preview
    let newImage
    const spotId = req.params.spotId
    const { url, preview } = req.body

    //check if there is an existing spot
    const existingSpot = await Spot.findByPk(spotId)

    newImage = await existingSpot.createSpotImage({
        spotId: spotId,
        url,
        preview
    })
    //為什不需要轉換成obj就可以在res.json拿資料?



    res.json({
        id: newImage.spotId,
        url: newImage.url,
        preview: newImage.preview
    })
})

//6.Edit a Spot
router.put('/:spotId', requireAuth, existingSpot, existingOwner, validateCreate, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const spotId = req.params.spotId


    //find the existing obj by spotId which needs to be changed
    let updateSpot = await Spot.findByPk(spotId)

    await updateSpot.update({
        ...req.body
    })


    //缺一個save
    // updateSpot.address= address
    // updateSpot.city= city
    // updateSpot.state= state
    // updateSpot.country= country
    // updateSpot.lat= lat
    // updateSpot.lng= lng
    // updateSpot.name= name
    // updateSpot.description= description
    // updateSpot.price= price

    //await updateSpot.save()
    // updateSpot = req.body


    res.json(updateSpot)
})

//7.delete a spot
router.delete('/:spotId', requireAuth, existingSpot, async (req, res, next) => {
    const spotId = req.params.spotId
    const userId = req.user.id

    //find the spot
    const deletSpot = await Spot.findByPk(spotId)


    if (Number(userId) !== deletSpot.ownerId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
        // const err = new Error("Forbidden")
        // err.status = 403
        // next(err)
    } else {
        // res.json(deletSpot)
        await deletSpot.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }

})

//8.Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, existingSpot, async (req, res, next) => {
    const spotId = req.params.spotId
    const userId = req.user.id

    //find ownerId
    const searchingSpot = await Spot.findOne({
        where: { id: spotId }
    })

    //find all the bookings by spotId
    const allBookings = await Booking.findAll({
        where: {
            spotId: spotId
        },
        attributes: ["id", "spotId", "userId", "startDate", "endDate", "createdAt", "updatedAt"],
        include: {
            model: User,
            attributes: ["id", "firstName", "lastName"]
        }
    })

    //check if spotId exists
    //check if current User equals to ownerId
    if (searchingSpot.ownerId !== userId) {
        let bookingList = []
        allBookings.forEach(booking => {
            bookingList.push(booking.toJSON())

        })
        bookingList.forEach(booking => {
            delete booking.User
            delete booking.id
            delete booking.userId
            delete booking.createdAt
            delete booking.updatedAt
        })
        res.json({ "Bookings": bookingList })
    } else {
        res.json({ "Bookings": allBookings })
    }

})



//9. Get all Reviews by a Spot's id
router.get('/:spotId/reviews', existingSpot, async (req, res) => {
    const spotId = req.params.spotId

    const allReviews = await Review.findAll({
        where: { spotId: spotId },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ]
    })

    res.json({ "Reviews": allReviews })
})


//10. Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, existingSpot, validateCreateReview, async (req, res, next) => {
    const spotId = req.params.spotId
    const { review, stars } = req.body
    const userId = req.user.id

    //check if the current user already reviewed the spot
    const allReviewsByCurrentUser = await Review.findAll({
        where: { userId: userId }
    })

    allReviewsByCurrentUser.forEach(review => {

        if (review.spotId === Number(spotId)) {
            res.status(403).json({
                "message": "User already has a review for this spot",
                "statusCode": 403
            })
        }
    })

    //check if stars must be 1-5
    if (stars <= 0 || stars > 5) {
        res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "stars": "Stars must be an integer from 1 to 5",
            }
        })
    }

    // const spotAddReview = await Spot.findByPk(spotId)
    const newReview = await Review.create({
        userId: req.user.id,
        spotId: spotId,
        review: review,
        stars: stars
    })

    res.status(201)
    res.json(newReview)
})


//11. Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, existingSpot, async (req, res) => {
    const spotId = req.params.spotId
    const userId = req.user.id
    const { startDate, endDate } = req.body
    let checkInDate = (new Date(startDate)).getTime()
    let checkOutDate = (new Date(endDate)).getTime()

    //Spot must NOT belong to the current user
    const spot = await Spot.findByPk(spotId)
    if (spot.ownerId === userId) {
        return res.json({
            message: "Spot must NOT belong to the current user",
            statusCode: 403
        })
    }

    //check if the endDate is not before startDate
    if (checkOutDate <= checkInDate) {
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
    }

    //check if there's a booking date conflict
    const allBookings = await Booking.findAll()
    allBookings.forEach(booking => {
        let bookingDate = new Date(booking.startDate)
        if (checkInDate - bookingDate === 0) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }
    })

    // const spotAddBooking = await Spot.findByPk(spotId)
    const newBooking = await Booking.create({
        userId: req.user.id,
        spotId: spotId,
        startDate: startDate,
        endDate: endDate
    })

    res.json(newBooking)
})


//12. Add Query Filters to Get All Spots
// router.get('/', async(req,res)=>{
//     let {page, size}= req.query
//     let pagination = {}
//     page = parseInt(page)
//     size = parseInt(size)

//     const err={
//         "message": "Validation Error",
//         "statusCode": 400,
//         "errors": {}
//     }

//     if(page === 0) err.errors.page = "Page must e greater than or equal to 1"
//     if(size ===0) err.errors.size= "Size must be greater than or equal to 1 "

//     if(isNaN(page)) page = 1
//     if(isNaN(size)) size = 20

//     if(page >=1 && size >=1){
//         if(size >= 20){
//             pagination.limit = 20
//         }else{
//             pagination.limit =size
//             pagination.offset = size *(page -1)
//         }
//     }


//     const spot = await Spot.findAll({
//         where,
//         ...pagination
//     })

//     if(page === 0 || size === 0){
//         return res.status(400).json(err)
//     }



//     return res.json({ Spots: page, size});
// })

module.exports = router;
