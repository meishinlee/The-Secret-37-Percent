const Item = require("../models/Item")
const express = require("express")
const User = require("../models/User")
const { route } = require("./users")
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

router.patch('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id)
  if (!item) {
    return res.status(404).send(
      'The product with the given ID was not found.'
    )
  }
  let query = { $set: {} };
  for (let key in req.body) {
    if (item[key] && item[key] !== req.body[key]) // if the field we have in req.body exists, we're gonna update it
      query.$set[key] = req.body[key];

    const updatedItem = await Item.updateOne({
      _id: req.params.id
    }, query)

    res.send(updatedItem)
  }
})

router.delete('/:id', (req, res) => {
  Item.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.send(err)
    } else {
      res.send({
        success: true,
        message: "Item deleted"
      })
    }
  }) 
})




module.exports = router