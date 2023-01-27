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
        ,
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


    res.json({"Bookings": bookingList})
})


//2.Get all Bookings for a Spot based on the Spot's id

router.get('/:spotId/bookings', requireAuth, async(req,res)=>{

})
module.exports = router;
