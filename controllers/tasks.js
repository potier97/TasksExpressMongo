var TaskModel = require('../models')
 
exports.getAllTasks = async function (req, res, next) {
  console.log('Obteniendo todos los registros de tareas')
  const allTasks = await TaskModel.find();
  res.status(200);
  res.json(allTasks); 
  res.end();
};

exports.getTaskById = async function (req, res, next) {
  const idTask = req.params.id
  if(idTask !== undefined){ 
    console.log('Obteniendo la tarea por el id -> ', idTask)
    const task = await TaskModel.findById(idTask);
    res.status(200);
    res.json({ task: task});
    res.end();
  }else{ 
    res.status(400).json({ message: "Error al obtener la tarea"});
    res.end(); 
  } 
};

exports.createTask = async function (req, res) {
  console.log('Creando una tarea nueva')
  if(req.body !== null){
    const newTask = new TaskModel(req.body);
    //console.log('NewTask -> ', newTask)
    await newTask.save();
    res.status(200).json({ message: "Tarea Creada"});
    res.end();
  }else{
    res.status(400).json({ message: "Error al crear la tarea"});
    res.end();
  }
};

exports.updateTask = async function (req, res) { 
  const idTask = req.params.id
  const body = req.body;
  const description = body.description;
  const author = body.author;
  const done = body.done;
  const hide = body.hide;
  if(idTask !== undefined && description !== undefined  
    && author !== undefined  && done !== undefined
    && hide !== undefined ){ 
    console.log('Actualizando la tarea por el id -> ', idTask)
    await TaskModel.findByIdAndUpdate(idTask, body);
    res.status(200);
    res.json({ message: "Tarea Actualizada" });
    res.end();
  }else{ 
    res.status(400).json({ message: "Error al eliminar la tarea"});
    res.end(); 
  } 
};

exports.deleteTask = async function (req, res, next) { 
  const idTask = req.params.id
  if(idTask !== undefined){ 
    console.log('Eliminando la tarea por el id -> ', idTask)
    await TaskModel.findByIdAndDelete(idTask);
    res.status(200);
    res.json({ message: "Tarea Eliminada" });
    res.end();
  }else{ 
    res.status(400).json({ message: "Error al eliminar la tarea"});
    res.end(); 
  } 
};


// exports.bicicleta_list = function(req, res){
//     Bicicleta.find({},function(err, bicicletas){
//         res.status(200).json({
//             bicicletas: bicicletas
//         });
//     });   
// }

// exports.bicicleta_create = function(req, res){
//     var bici = new Bicicleta({ code: req.body.code, color: req.body.color, modelo: req.body.modelo });
//     bici.ubicacion = [req.body.lat, req.body.lng];

//     Bicicleta.add(bici);

//     res.status(200).json({
//         bicicleta: bici
//     });
// }

// exports.bicicleta_update = function(req, res){
    
//     Bicicleta.findByCode(req.params.id, function(error, bici){
        
//         bici.code = req.body.code;
//         bici.color = req.body.color;
//         bici.modelo  = req.body.modelo;
//         bici.ubicacion = [req.body.lat, req.body.lng];
        
//         Bicicleta.update(bici, (err, raw) => {

//             res.status(200).json({
//                 bicicleta: bici
//             });

//         });
//     }); 
// }

// exports.bicicleta_delete = function(req, res){
//     Bicicleta.removeByCode(req.body.code, (err, raw) => {
        
//         res.status(204).send();

//     });
    
// }
