const mongoose = require('mongoose')

const schema = mongoose.Schema

const ExtractSchema = new schema({
    pdf: String,
})

const ExtractModel = mongoose.model('Extractpdf_tb',ExtractSchema)

module.exports = ExtractModel