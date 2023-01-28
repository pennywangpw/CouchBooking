const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Sequelize = require('sequelize')

// //check if current user is the owner of the booking
// const validateCurrentUser = async(req,res,next)=>{
// const userId = req.user.id
// const validUser = await Booking.findOne({
//     where:{userId: userId}
// })

// if(!validUser){
//     return res.status(401).json({
//         "message":"Booking must belong to the current user",
//         "statusCode":401
//     })
// }
// return next()
// }

//check if current user is the owner of the booking
// const validateCxlBooking = async(req,res,next)=>{
//     const bookingId = req.params.bookingId
//     const cxlBooking = await Booking.findByPk(bookingId)
//     if(!cxlBooking){
//         return res.status(404).json({
//             "message":"Booking couldn't be found",
//             "statusCode":404
//         })
//     }
// return next()
// }

// //Edit validation
// const validateEdit = [
//     check('endDate')
//       .exists({ checkFalsy: true })
//       .notEmpty()
//       .isAfter()
//       .withMessage('endDate cannot come before startDate'),
//     handleValidationErrors
//   ];

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

// //2.Edit a Booking
// router.put('/:bookingId', requireAuth, validateEdit, validateCurrentUser, async(req,res,next)=>{
//     const {id, spotId, userId, startDate, endDate, createdAt, updatedAt} = req.body
//     const modifiedBooking = await Booking.findOne({
//         where:{
//             id: req.params.bookingId
//         }
//     })

//     modifiedBooking.id = id
//     modifiedBooking.spotId = spotId
//     modifiedBooking.userId = userId
//     modifiedBooking.startDate = startDate
//     modifiedBooking.endDate = endDate
//     modifiedBooking.createdAt = createdAt
//     modifiedBooking.updatedAt = updatedAt

//     res.json(modifiedBooking)
// })

//3.Delete a Booking
router.delete('/:bookingId', requireAuth, async(req,res)=>{
    //can't find the bookingId
    const bookingId = req.params.bookingId
    const cxlBooking = await Booking.findByPk(bookingId)

    if(!cxlBooking){
        return res.status(404).json({
            "message":"Booking couldn't be found",
            "statusCode":404
        })
    }

    //if current user is not booking owner then can't cxl it
        const userId = req.user.id
    if(userId !== cxlBooking.userId){
        return res.status(401).json({
            "message":"Booking must belong to the current user",
            "statusCode":401
        })
    }

    //check if the date can't be modified anymore
    let today = new Date()
    const startDate = cxlBooking.startDate
    // console.log("今天: ", typeof today)
    // console.log("入住日: ", typeof startDate)
    if(new Date(startDate) <= today){
        res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
          })
    }else{
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }

})

module.exports = router;
