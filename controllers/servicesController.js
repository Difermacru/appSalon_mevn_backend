import Services from '../models/Services.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//metodo post sirve para realizar un llamado post a postman
//verifica que los campos esten llenos 
const createService = async(req, res) => {
    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los campos son obligatorios')

        return res.status(400).json({
            msg: error.message
        })
    }

    try {
        //crea un nuevo registro si todo esta correcto
        const service = new Services(req.body)
        await service.save()

        res.json({
            msg:'el servicio se creo correctamente'
        })
    }catch(error){
        console.log(error)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//metodo get sirve para hacer un llamado get a postman
//y trae todos los registros de mongoDB
const getServices = async (req, res) => {
    try{
        const services = await Services.find()
        res.json(services)
    }catch(error){
        console.log(error)
    }
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//metodo get para obtener registros con un id
const getServicesById = async (req, res) =>{
    const {id} = req.params

    //valida que el id tenga la estructura correcta
    if(validateObjectId(id, res)) return

    //verifica que el id exista
    const service = await Services.findById(id)
    if(!service){
       return handleNotFoundError('El Servicio no existe', res)
    }

    //muestra el registro si todo esta correcto
    res.json(service)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

//actualiza un registro
const updateService = async (req, res)=>{
    const {id} = req.params

    //valida que el id tenga la estructura correcta
    if(validateObjectId(id, res)) return

    //verifica que el id exista
    const service = await Services.findById(id)
    if(!service){
       return handleNotFoundError('El Servicio no existe', res)
    }
    
    //se actualiza estos campos o si no se deja el valor por defecto
    service.name = req.body.name || service.name
    service.price = req.body.price || service.price

    try{
        await service.save()
        res.json({
            msg: 'El servicio se actualizo correctamente'
        })
    }catch(error){
        console.log(error)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const deleteService = async (req, res) => {
    const {id} = req.params
    //valida que el id tenga la estructura correcta
    if(validateObjectId(id, res)) return

    //verifica que el id exista
    const service = await Services.findById(id)
    if(!service){
    return handleNotFoundError('El Servicio no existe', res)
}

try{
    await service.deleteOne()
    res.json({
        msg: 'El servicio se elimino correctamente'
    })
}catch(error){
    console.log(error)
}

}

export {
    createService,
    getServices,
    getServicesById,
    updateService,
    deleteService
}