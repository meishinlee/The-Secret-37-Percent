const express = require("express")
const router = express.Router()
const User = require("../models/User")

console.log('in users route')

//for hashing passwords
const bcrypt = require("bcrypt")
const saltRounds = 10

async function passMatch(user, password) {
  //compares inputted password with hashed password in db
  const match = await bcrypt.compare(password, user.password)
  return match
}

// logins the user in if email and password matches
router.post("/login", (req, res) => {
    var { email, password } = req.body
    //find user with given email in the database
    User.findOne({ email: email }, async (err, user) => {
      //no user in database has specified email
      if (!user) {
        res.send({
          success: false,
          message: "User does not exist"
        })
      } else {
        //email exists but incorrect password
        let match = await passMatch(user, password)
        if (!match) {
          console.log("wrong email or password")
          res.send({
              success: false,
              message: "wrong email or password"
            })
        } else {
          //email and passwords match
          console.log("Success: email and password match")
          res.send({
              success: true,
              message: "Email and password match",
              name : user.name
          })
        }
      }
    })
  })

// registers the user if the email isn't already taken
router.post("/register", (req, res) => {
    console.log('in post')
    var { name, email, password } = req.body
    //hash password
    bcrypt.hash(password, saltRounds, function (err, hash) {
      let hashedPassword = hash
  
      //create a user using the payload and hashed password
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,

      })
  
      User.find({ email: user.email }, (err, emails) => {
        //if user already exists in database
        if (emails.length) {
          res.send({
            success: false,
            message:  "Email already exists"
          })
        } else {
          //add the user to the db
          user.save((err) => {
            if (err) {
              console.log(err)
            } else {
              res.send({
                success: true,
                message: "User successfully added"
              })
            }
          })
        }
      })
    })
  })
  
module.exports = router