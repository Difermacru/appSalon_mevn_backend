import mongoose from 'mongoose'

//crea la estructura cuando se hace el llamado get y post en el postman
const servicesSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type : Number,
        required: true,
        trim: true,
    }
})

const Services = mongoose.model('Services', servicesSchema)
export default Services