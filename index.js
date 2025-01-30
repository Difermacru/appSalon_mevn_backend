import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import userRoutes from './routes/userRoutes.js'

//variables de entorno
dotenv.config()

//configurar app
const app = express()

//leer datos via body
app.use(express.json())

//conecta
db()

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL]

if(process.argv[2] === '--postman') {
    whitelist.push(undefined)
}

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.includes(origin)) {
            // Permite la conexión
            callback(null, true)
        } else {
            // No permitir la conexión
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))


//definir una ruta
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments',appointmentRoutes)
app.use('/api/users',userRoutes)

//definir puerto
const PORT = process.env.PORT || 4000

//arrancar la app
app.listen(PORT, ()=> {
    console.log(colors.blue('ejecutando'), colors.bold (PORT))
})
