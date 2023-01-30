const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage} = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Sequelize = require('sequelize')

//check if the imageId exsits
const exsitingImage = async(req,res,next)=>{
    const imageId = req.params.imageId
    const deletedImage = await ReviewImage.findByPk(imageId)

    if(!deletedImage){
        return res.status(404).json({
            "message":"Review Image couldn't be found",
            "statusCode":404
        })
    }
    return next()
}


//check if current user is the owner of the spot
const validateCurrentUser = async(req,res,next)=>{
    const currentUserId = req.user.id
    const imageId = req.params.imageId
    const review = await Review.findOne({
        where:{id: imageId}
    })


    if(currentUserId !== review.userId){
        return res.status(403).json({
            "message":"Review must belong to the current user",
            "statusCode":403
        })
    }
    return next()
    }


//0.Get all Review Image
router.get('/', async(req,res)=>{
    const allReviewImgs = await ReviewImage.findAll()
    res.json(allReviewImgs)
})

//1.Delete a Review Image
router.delete('/:imageId', requireAuth, exsitingImage,validateCurrentUser, async(req, res)=>{
    const imageId = req.params.imageId

    const deleteReviewImg = await ReviewImage.findByPk(imageId)

    await deleteReviewImg.destroy()

    // //Review must belong to the current user
    // const userId = req.user.id
    // const validUser = await Review.findOne({
    //     where:{userId: userId}
    // })

    // if(!validUser){
    //     return res.status(401).json({
    //         "message":"Booking must belong to the current user",
    //         "statusCode":401
    //     })
    // }


    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})

module.exports = router;
