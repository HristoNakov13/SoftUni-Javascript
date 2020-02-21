const mongoose = require("mongoose");

const accesorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },

        imageUrl: { type: String, required: true },

        description: { type: String, required: true },

        cubes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cubes' }]
    }
);

module.exports = mongoose.model("Accessory", accesorySchema);