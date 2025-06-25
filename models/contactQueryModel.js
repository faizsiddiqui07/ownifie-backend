const mongoose = require('mongoose')

const contactQuerySchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^[0-9]{10}$/, 'Phone number must be 10 digits']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: true,
    }
}, {
    timestamps: true
})

const contactQueryModel = mongoose.model("ContactQuery", contactQuerySchema)

module.exports = contactQueryModel