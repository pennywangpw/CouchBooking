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



//check if the bookinId exsits
const exsitingBooking = async(req,res,next)=>{
    const bookingId = req.params.bookingId
    const booking = await Booking.findByPk(bookingId)
    if(!booking){
        return res.status(404).json({
            "message":"Booking couldn't be found",
            "statusCode":404
        })
    }
return next()
}

//check if current user is the booking user
const ValidateCurrentUser = async(req,res,next)=>{
    const userId= req.user.id
    const bookingId = req.params.bookingId
    const modifiedBooking = await Booking.findByPk(bookingId)
    if(userId !== modifiedBooking.userId){
        return res.status(403).json({
            "message":"Booking must belong to the current user",
            "statusCode":403
        })
    }
    return next()
}


//0.Get all bookings
router.get('/', async(req,res)=>{
    const allbookings = await Booking.findAll()
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

    let bookingList = []
    bookings.forEach(booking=>{bookingList.push(booking.toJSON())})

    //get the spotImages> url and add it into bookingList.previewImage
    bookingList.forEach(booking=>{
        let bookingSpot = booking.Spot
        let bookingSpotImage = bookingSpot.SpotImages

        if(bookingSpotImage.length > 0){
            bookingSpotImage.forEach(img=>{
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
router.put('/:bookingId', requireAuth, exsitingBooking, ValidateCurrentUser, async(req,res,next)=>{
    const currentuserId= req.user.id
    const {id, spotId, userId, startDate, endDate, createdAt, updatedAt} = req.body
    const bookingId = req.params.bookingId
    let checkInDate = (new Date(startDate)).getTime()
    let checkOutDate = (new Date(endDate)).getTime()


    //check if the date is in the past, if so, you can't modify it 403
    let today = Date.now()
    if(checkOutDate <= today || checkInDate <= today){
        res.status(403).json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
          })
    }

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

    //check if there's a booking date conflict
    const allBookings = await Booking.findAll()
    allBookings.forEach(booking=>{
        let bookingDate = new Date(booking.startDate)
        if(checkInDate - bookingDate === 0){
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

    
    //find the booking we want to modify
    const modifiedBooking = await Booking.findByPk(bookingId)
    await modifiedBooking.update({
        ...req.body
    })

    // modifiedBooking.id = id
    // modifiedBooking.spotId = spotId
    // modifiedBooking.userId = userId
    // modifiedBooking.startDate = startDate
    // modifiedBooking.endDate = endDate
    // modifiedBooking.createdAt = createdAt
    // modifiedBooking.updatedAt = updatedAt
    // await modifiedBooking.save()

    res.json(modifiedBooking)
})

//3.Delete a Booking
router.delete('/:bookingId', requireAuth, exsitingBooking, async(req,res)=>{
    const bookingId = req.params.bookingId
    const deleteBooking = await Booking.findByPk(bookingId)
    const userId = req.user.id
    //find the booking spot
    const bookingSpotId = deleteBooking.spotId
    const bookingSpot = await Spot.findByPk(bookingSpotId)

    //Booking must belong to the current user or the Spot must belong to the current user
    if(userId !== deleteBooking.userId && userId !== bookingSpot.ownerId){
        return res.status(403).json({
            "message":"Booking must belong to the current user",
            "statusCode":403
        })
    }

    //check if the date is in the past, if so, you can't delete it 403
    let today = new Date()
    const startDate = deleteBooking.startDate

    if(new Date(startDate) <= today){
        res.status(403).json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
          })
    }
    //if none of above you are able to delete it
    else{

        await deleteBooking.destroy();

        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }

})

module.exports = router;
