import dotenv from 'dotenv'
import colors from 'colors'
import {db} from '../config/db.js'
import Services from '../models/Services.js'
import { services } from './beautyServices.js'

dotenv.config()
await db()

//funcion para agregar registros masivos a mongoDB
//SE IMPORTAN AL PACKAGE JSON Y SE LES DA UN ALIAS PARA EJECUTARSE EN LA TERMINAL (import)
async function seedDB(){
    try{
        await Services.insertMany(services)
        console.log(colors.green.bold('Se agregaron los datos Correctamente'))
        process.exit()
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

//funcion para eliminar datos de mongoDB
//SE IMPORTAN AL PACKAGE JSON Y SE LES DA UN ALIAS PARA EJECUTARSE EN LA TERMINAL (destroy)
async function clearDB(){
    try{
        await Services.deleteMany()
        console.log(colors.red.bold('Se eliminaron los datos Correctamente'))
        process.exit()
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

if(process.argv[2] === '--import'){
    seedDB()
}else{
    clearDB()
}
