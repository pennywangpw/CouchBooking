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
        },
        include:[
            {
                model: Spot
            }
        ]
    })
    // console.log("在這: ", bookings)
    let bookingList = []
    bookings.forEach(booking=>{bookingList.push(booking.toJSON())})
    console.log("在這: ", bookingList)

    res.json("ues")
})


module.exports = router;
