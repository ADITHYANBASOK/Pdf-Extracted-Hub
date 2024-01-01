const mongoose = require('mongoose')

const schema = mongoose.Schema

const UploadSchema = new schema({
    pdf: String,
    title: String,
})

const UploadModel = mongoose.model('Uploadpdf_tb',UploadSchema)

module.exports = UploadModel