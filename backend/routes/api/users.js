const express = require('express')
const router = express.Router();


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors
];



// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    //check if username already exists
    //check if user meail already exists
    //if it exists then I throw error 403

    //same thing
    // const existinguser = await User.findOne({
    //   where: { username: username }
    // })

    const existinguser = await User.findOne({
      where: { username }
    })

    const existinguseremail = await User.findOne({
      where: { email }
    })

    if (existinguser) {
      return res.status(403).json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": [
          "User with that username already exists"
        ]
      })
    }


    if (existinguseremail) {
      return res.status(403).json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": [
          "User with that email already exists"
        ]
      })
    }

    const user = await User.signup({ email, username, password, firstName, lastName });

    // //check if user exsits in the system
    // const allUsers = await User.findAll()
    // console.log("所有user: ", allUsers)
    // // if(email === deletSpot.ownerId){

    // // }
    const token = await setTokenCookie(res, user);

    const returnUser = {
      "id": user.id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "username": user.username,
      "token": token
    }

    return res.json({
      user: returnUser
    });
  }
);




module.exports = router;
