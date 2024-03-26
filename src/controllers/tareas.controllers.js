import Tarea from '../database/models/tarea.js'

export const listarTareas = async(req, res)=>{
    try {
        const tareas = await Tarea.find()
        res.status(200).json(tareas)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: 'Error al buscar las tareas'})
    }
}

export const crearTarea = async(req, res)=>{
    try {
        const tareaNueva = new Tarea(req.body);
        await tareaNueva.save();
        res.status(201).json(
            {mensaje:'La tarea fue creada exitosamente'})
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje:'La tarea no pude ser creada'})
    }
}

export const obtenerTarea = async(req, res)=>{
    try {
        console.log(req.params.id)
        const tareaBuscada = await Tarea.findById(req.params.id)
        if(!tareaBuscada){
            return res.status(404).json({mensaje: 'No se encontro la tarea con el id enviado'})
        }
        res.status(200).json(tareaBuscada)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: 'No se pudo encontrar la tarea solicitada'})
    }
}

export const editarTarea = async(req, res)=>{
    try {
         const tareaBuscada = await Tarea.findById(req.params.id)
         if(!tareaBuscada){
            return res.status(404).json({mensaje: 'No se encontro la tarea a editar'})
         }
        await Tarea.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({mensaje: 'Tarea editada con exito'})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: 'Error interno en la solicitud, no se edito la tarea'})
    }
}

export const borrarTarea = async(req, res)=>{
    try {
         const tareaBuscada = await Tarea.findById(req.params.id)
         if(!tareaBuscada){
            return res.status(404).json({mensaje: 'No se borró la tarea'})
         }
        await Tarea.findByIdAndDelete(req.params.id)
        res.status(200).json({mensaje: 'Tarea borrada con exito!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: 'Error interno en la solicitud, no se edito la tarea'})
    }
}