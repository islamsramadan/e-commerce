const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("category", categorySchema);
