const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking} = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const Sequelize = require('sequelize')

//check if the imageId exsits
const exsitingImage = async(req,res,next)=>{
    const imageId = req.params.imageId
    const deletedImage = await SpotImage.findByPk(imageId)

    if(!deletedImage){
        return res.status(404).json({
            "message":"Spot Image couldn't be found",
            "statusCode":404
        })
    }
    return next()
}

//1.Delete a Review Image
router.delete('/:imageId', requireAuth, exsitingImage, async(req, res)=>{

    //Review must belong to the current user
    const userId = req.user.id
    const validUser = await Review.findOne({
        where:{userId: userId}
    })

    if(!validUser){
        return res.status(401).json({
            "message":"Booking must belong to the current user",
            "statusCode":401
        })
    }

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})

module.exports = router;
