const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require('../models/user')


module.exports.userLogin = function userLogin(req, res, next) {

    const email = req.body.email
    const password = req.body.password

    User.findOne({ email: email })
        .then(user => {
            if (!user) { // no email found
                return res.status(401).json({
                    success: false,
                    message: "invalid email or password",
                })
            }
            else {
                bcrypt.compare(password, user.password).then(isEqual => {
                    if (!isEqual) { // password is incorrect
                        return res.status(401).json({
                            success: false,
                            message: "invalid email or password",
                        })
                    }
                    else { // successful login
                        const token = jwt.sign({
                            id: user._id,
                            email: user.email,
                            role: user.role
                        },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: "1h" }
                        )
                        res.status(200).json({
                            success: true,
                            message: 'successful login',
                            token: token,
                            expireIn: '3600'
                        })
                    }
                })
            }
        })
        .catch(err => {
            err.status = 500
            next(err)
        })
}


module.exports.userSignup = function userSignup(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const phone = req.body.phone;
    const address = {
        city: req.body.city,
        street: req.body.street,
        building: req.body.building,
        floor: req.body.floor
    }

    User.findOne({ email: email })
        .then(user => {
            if (user) { // email already exist in database
                return res.status(401).json({
                    success: false,
                    message: "this email exist on our data",
                })
            }
            else {
                // hashing password and save in database
                bcrypt.hash(password, 10).then(hashedPassword => {
                    return new User({
                        email: email,
                        password: hashedPassword,
                        role: role,
                        phone: phone,
                        address: address
                    }).save().then(() => {
                        res.status(201).json({
                            success: true,
                            message: "User created Successfully",
                        });
                    })
                })
            }
        })
        .catch(err => {
            err.status = 500
            next(err)
        })
}