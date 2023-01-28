const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Sequelize = require('sequelize')


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



module.exports = router;
