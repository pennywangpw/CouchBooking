const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage} = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Sequelize = require('sequelize')

const validateEdit = [
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

//check if current user is the owner of the review
const validateCurrentUser = async(req,res,next)=>{
    const userId = req.user.id
    const reviewId = Number(req.params.reviewId)
    const review = await Review.findByPk(reviewId)

    if(userId !== review.userId){
        return res.status(403).json({
            "message":"Spot must belong to the current user",
            "statusCode":403
        })
    }
    return next()
  }




//0. Get all Reviews
router.get('/', requireAuth, async(req,res)=>{
    const userId = req.user.id

    const allReviews = await Review.findAll()

    res.json(allReviews)
})

//1. Get all Reviews of the Current User
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
router.post('/:reviewId/images', exsitingReviewId,validateCurrentUser, async(req,res,next)=>{
    const reviewId = req.params.reviewId


    const reviewTobeAddedImg = await Review.findByPk(reviewId,{
        include:{model: ReviewImage}
    })
    // console.log("here: ", reviewTobeAddedImg.ReviewImages.length)

    if (reviewTobeAddedImg.ReviewImages.length >= 10) {
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }


    const {url} = req.body


    const newImage = await reviewTobeAddedImg.createReviewImage({
        reviewId: reviewId,
        url
    })

    res.json({
        id:newImage.id,
        url: newImage.url
    })
})

//solution2
// router.post('/:reviewId/images',requireAuth, async(req,res)=>{
//     const reviewId = Number(req.params.reviewId)
//     const {url} = req.body


//     let newImage = await ReviewImage.create({
//         reviewId: reviewId
//     })

//     res.json(newImage)
// })

//3. Edit a Review
router.put('/:reviewId', requireAuth, exsitingReviewId, validateCurrentUser, validateEdit, async(req,res,next)=>{
    //check if stars must be 1-5
    const{stars} = req.body
    if(stars <=0 || stars > 5){
        res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "stars": "Stars must be an integer from 1 to 5",
            }
        })
    }

    const reviewId = req.params.reviewId

    const updateReview = await Review.findByPk(reviewId)

    await updateReview.update({
        ...req.body
    })

    res.json(updateReview)
})

//4. Delete a Review
router.delete('/:reviewId', requireAuth, exsitingReviewId, validateCurrentUser, async(req,res,next)=>{
    const reviewId = req.params.reviewId

    const deleteReview = await Review.findByPk(reviewId)

    await deleteReview.destroy()

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
