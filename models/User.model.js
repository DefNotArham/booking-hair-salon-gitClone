const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        name: {
            type: String,
        },
        lastName: {
            type: String,
        },
        password: String,
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

module.exports = User;
