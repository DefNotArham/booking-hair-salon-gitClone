const {Schema, model} = require("mongoose");

const appointmentSchema = new Schema(
    {
        date: {
            type: Date,
        },
        hour: String,
        professional: {type: Schema.Types.ObjectId, ref: 'Professional'},
        user: {type: Schema.Types.ObjectId, ref: 'User'}
    },
    {
        timestamps: true,
    }
);

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;
