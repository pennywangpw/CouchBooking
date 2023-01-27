const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage,Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Sequelize = require('sequelize')


//1.Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req,res)=>{
    console.log("1234564987")
    const bookings = await Booking.findAll({
        where:{
            userId: req.user.id
        }
    })
    console.log("在這: ",bookings)
    res.json("ues")
})
