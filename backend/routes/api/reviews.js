const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage} = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Sequelize = require('sequelize')

//1.Get all Reviews of the Current User
router.get('/current', requireAuth, async(req,res)=>{
    const userId = req.user.id

    const allReview = await Review.findAll({
        where:{
            userId : userId
        },
        include:[
            {
                model: User,
                attributes:["id","firstname","lastname"]

            },
            {
                model: Spot,
                attributes:["id","ownerId","address","city","state","country","lat","lng","name","price"],
                include:[
                    {model: SpotImage}
                ]
            },
            {
                model: ReviewImage
            },

        ]
    })



    let reviewList = []
    allReview.forEach(review=>{reviewList.push(review.toJSON())})

    reviewList.forEach(review=>{
        let reviewSpot = review.Spot
        let reviewSpotImage = reviewSpot.SpotImages

        if(reviewSpotImage.length > 0){
            reviewSpotImage.forEach(img=>{
                reviewSpot.previewImage = img.url
            })
        }
        delete reviewSpot.SpotImages
    })



    res.json({"Reviews": allReview})
})

module.exports = router;
