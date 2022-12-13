const router = require("express").Router()

const { token } = require("morgan")
const User = require("../models/User.model")

const { isAuthenticated } = require('./../middleware/jwt.middleware')

const bcrypt = require('bcryptjs')


router.post('/signup', (req, res, next) => {

    const { email, password, username } = req.body

    User
        .create({ email, password, username })
        .then((createdUser) => {

            const { email, username, _id } = createdUser
            const user = { email, username, _id }
            res.status(201).json({ user })

        })
        .catch(err => next(err))
})


//ruta para conseguir los datos de todos los usuarios

router.get("/getAllUsers", (req, res) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// <<--------------------------------------------------->>

router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ errorMessages: ['Indica email y contraseña'] })
        return
    }

    User
        .findOne({ email })
        .then(foundUser => {
            if (foundUser && foundUser.validatePassword(password)) {
                res.status(200).json({ authToken: foundUser.signToken() })
            }
            else {
                res.status(401).json({ errorMessages: ['Usuario o contraseña incorrectos'] })
            }
        })
        .catch(err => next(err))
})



router.get('/verify', isAuthenticated, (req, res) => {

    res.status(200).json(req.payload)


})


router.delete("/deleteUser/:user_id", (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})





module.exports = router