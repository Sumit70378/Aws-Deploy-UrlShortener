const mongoose = require("mongoose")
const ProjectSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    totalClicks: {
        type: String,
        
    },
    visitHistory: [{
        timestamp: { type: Number }
    }],
}, { timestamps: true })

const Url = mongoose.model("Url_Shortner", ProjectSchema)
module.exports = Url