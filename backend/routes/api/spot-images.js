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


//check if current user is the owner of the spot
const validateCurrentUser = async(req,res,next)=>{
const userId = req.user.id
const imageId = req.params.imageId
const spotImg = await SpotImage.findByPk(imageId)
const spotId = spotImg.spotId
const spot = await Spot.findByPk(spotId)


if(userId !== spot.ownerId){
    return res.status(403).json({
        "message":"Booking must belong to the current user",
        "statusCode":403
    })
}
return next()
}


//0.Get all Spot Image
router.get('/', async(req,res)=>{
    const allSpotImgs = await SpotImage.findAll()
    res.json(allSpotImgs)
})

//1.Delete a Spot Image
router.delete('/:imageId', requireAuth, exsitingImage, validateCurrentUser, async(req, res)=>{
    const imageId = req.params.imageId

    //find the image
    const deleteSpotImg = await SpotImage.findByPk(imageId)

    await deleteSpotImg.destroy()

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})



module.exports = router;
