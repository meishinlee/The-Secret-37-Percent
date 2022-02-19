var mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    email: String,
    name: String,
    amountConsumed: Number,
    units: String,
    carbonFootprintValue: Number

})

module.exports = mongoose.model('Item', itemSchema)