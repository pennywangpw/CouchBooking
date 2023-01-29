const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage} = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Sequelize = require('sequelize')

//check if the reviewId exsits
const exsitingReviewId = async(req,res,next)=>{
    const reviewId = req.params.reviewId
    const review = await Review.findByPk(reviewId)
    if(!review){
        return res.status(404).json({
            "message":"Review couldn't be found",
            "statusCode":404
        })
    }
return next()
}

//0.Get all Reviews
router.get('/', requireAuth, async(req,res)=>{
    const userId = req.user.id

    const allReviews = await Review.findAll()

    res.json(allReviews)
})

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
                attributes:["id","firstName","lastName"]

            },
            {
                model: Spot,
                attributes:["id","ownerId","address","city","state","country","lat","lng","name","price"],
                include:[
                    {model: SpotImage}
                ]
            },
            {
                model: ReviewImage,
                attributes:["id","url"]
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

    res.json({"Reviews": reviewList})
})

//2. Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', exsitingReviewId, async(req,res)=>{
    const reviewId = req.params.reviewId
    const {url} = req.body

    // const reviewAddImg = await Review.findByPk(reviewId)

    // const newImage = await reviewAddImg.createReviewImage({
    //     url: url
    // })

    const newImage = await ReviewImage.create({
        url: url
    })

    res.json(newImage)
})

//其他方案,但上面的成功了
// router.post('/:reviewId/images',requireAuth, async(req,res)=>{
//     const reviewId = Number(req.params.reviewId)
//     const {url} = req.body
//     console.log("印出來: ", typeof reviewId)

//     let newImage = await ReviewImage.create({
//         reviewId: reviewId
//     })

//     res.json(newImage)
// })



module.exports = router;
