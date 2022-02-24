const {Schema, model} = require("mongoose");

const professionalSchema = new Schema(
    {
        name: {
            type: String,
        },
        lastName: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        description: String,
    },
    {
        timestamps: true,
    }
);

const Professional = model("Professional", professionalSchema);

module.exports = Professional;
