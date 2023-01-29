const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Sequelize = require('sequelize')

// //check if current user is the spot owner OR booking user
// const validateCurrentUser = async(req,res,next)=>{
// const userId = req.user.id
// const spot = await Spot.findAll()
// const booking = await Booking.findAll()


// if(userId !== spot.ownerId || userId !== booking.userId){

//     return res.status(403).json({
//         "message":"Booking must belong to the current user",
//         "statusCode":403
//     })
// }

//     return next()
// }



//check if the booking exsits
const exsitingBooking = async(req,res,next)=>{
    const bookingId = req.params.bookingId
    const cxlBooking = await Booking.findByPk(bookingId)
    if(!cxlBooking){
        return res.status(404).json({
            "message":"Booking couldn't be found",
            "statusCode":404
        })
    }
return next()
}


// //Edit validation
// const validateEdit = [
//     check('endDate')
//       .exists({ checkFalsy: true })
//       .notEmpty()
//       .isAfter()
//       .withMessage('endDate cannot come before startDate'),
//     handleValidationErrors
//   ];

//0.Get all bookings
router.get('/', async(req,res)=>{
    const allbookings = await Booking.findAll({
        // include:["id","spotId","userId","startDate","endDate","createdAt","updatedAt"]
    })
    res.json(allbookings)
})

//1.Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req,res)=>{
    const bookings = await Booking.findAll({
        where:{
            userId: req.user.id
        }
        ,attributes:["id","spotId","userId","startDate","endDate","createdAt","updatedAt"],
        include:[
            {
                model: Spot,
                attributes:["id","ownerId","address","city","state","country","lat","lng","name","price"],
                include:[
                    {model: SpotImage}
                ]
            }
        ]
    })
    // console.log("在這: ", bookings)
    let bookingList = []
    bookings.forEach(booking=>{bookingList.push(booking.toJSON())})

    //get the spotImages> url and add it into bookingList.previewImage
    bookingList.forEach(booking=>{
        let bookingSpot = booking.Spot
        let bookingSpotImage = bookingSpot.SpotImages
        // console.log("spot裡面:", bookingSpotImage )

        if(bookingSpotImage.length > 0){
            bookingSpotImage.forEach(img=>{
                console.log("img.preview: ",img.preview)
                if(img.preview){
                    bookingSpot.previewImage = img.url

                }
            })
        }
        delete bookingSpot.SpotImages
    })


    res.json({"Bookings": bookingList})
})

//2.Edit a Booking
router.put('/:bookingId', requireAuth, exsitingBooking, async(req,res,next)=>{
    const currentuserId= req.user.id
    const {id, spotId, userId, startDate, endDate, createdAt, updatedAt} = req.body
    const bookingId = req.params.bookingId
    let checkInDate = new Date(startDate)
    let checkOutDate = new Date(endDate)


    const modifiedBooking = await Booking.findByPk(bookingId)
    console.log("所有的booking?: ", modifiedBooking)
    console.log("userId: ", currentuserId, "modifiedBooking.userId: ", modifiedBooking.userId)
    console.log("現在的booking: ", modifiedBooking)

    //check if current user is the booking user
    if(currentuserId !== modifiedBooking.userId){

        return res.status(403).json({
            "message":"Booking must belong to the current user",
            "statusCode":403
        })
    }


    //check if the date is in the past, if so, you can't delete it 403
    let today = new Date()

    if(checkOutDate <= today){
        res.status(403).json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
          })
    }


    //check if there's a booking date conflict
    const allBookings = await Booking.findAll()
    allBookings.forEach(booking=>{
        let bookingDate = new Date(booking.startDate)
        if(checkInDate.getTime() - bookingDate.getTime() === 0){
            return res.status(403).json({
                "message":"Sorry, this spot is already booked for the specified dates",
                "statusCode":403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }
    })


    //check if the endDate is not before startDate
    if(checkOutDate <= checkInDate){
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot come before startDate"
            }
          })
    }

    modifiedBooking.id = id
    modifiedBooking.spotId = spotId
    modifiedBooking.userId = userId
    modifiedBooking.startDate = startDate
    modifiedBooking.endDate = endDate
    modifiedBooking.createdAt = createdAt
    modifiedBooking.updatedAt = updatedAt

    res.json(modifiedBooking)
})

//3.Delete a Booking
router.delete('/:bookingId', requireAuth, exsitingBooking, async(req,res)=>{
    // //can't find the bookingId
    const bookingId = req.params.bookingId
    const cxlBooking = await Booking.findByPk(bookingId)
    // const spotId = await Spot.findAll()
    // console.log("所有的spot: ",spotId)

    const userId = req.user.id

    if(userId !== cxlBooking.userId){

        return res.status(403).json({
            "message":"Booking must belong to the current user",
            "statusCode":403
        })
    }

    //check if the date is in the past, if so, you can't delete it 403
    let today = new Date()
    const startDate = cxlBooking.startDate

    if(new Date(startDate) <= today){
        res.status(403).json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
          })
    }
    //if none of above you are able to delete it
    else{

        await cxlBooking.destroy();

        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }

})

module.exports = router;
