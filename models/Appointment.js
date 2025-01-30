import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
    services:[
        {
            type: mongoose.Schema.Types.ObjectId,//trae el id del servicio de mongoose
            ref: 'Services' //hace un cruce entre Appointment.js y con el models de Services.js para que traiga el nombre y  precio 
        }
    ],
    date: {
        type: Date
    },
    time: {
        type: String
    },
    totalAmount: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,//trae el id del usuario de mongoose
        ref: 'User' //hace un cruce entre Appointment.js con el models de User.js para que traiga los otros datos de User.js
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

export default Appointment