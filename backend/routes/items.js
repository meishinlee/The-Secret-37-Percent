const express = require("express")
const Item = require("../models/Item")
const User = require("../models/User")
const router = express.Router()

router.post("/", (req, res) => {
  var { email, name, amountConsumed, units, carbonFootprintValue } = req.body
  //find user with given email in the database
  User.findOne({ email: email }, async (err, user) => {
    //no user in database has specified email
    if (!user) {
      res.send({
        success: false,
        message: "User does not exist"
      })
    } else {
      const item = new Item({
        email: email,
        name: name,
        amountConsumed: amountConsumed,
        units: units,
        carbonFootprintValue: carbonFootprintValue
      })

      item.save(err => {
        if (err) {
          res.send({
            success: false,
            message: "Error: " + err
          })
        } else {
          res.send({
            success: true,
            message: "Item added"
          })
        }
      })
    }
  })
})

router.get("/", (req, res) => {
  var { email } = req.query
  //find user with given email in the database

  User.findOne({ email: email }, async (err, user) => {
    //no user in database has specified email
    if (!user) {
      res.send({
        success: false,
        message: "User does not exist"
      })
    } else {
      const items = await Item.find({ email: email })
      res.send({
        items: items
      })
    }
  })
})

module.exports = router