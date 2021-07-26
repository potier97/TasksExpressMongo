var express = require('express');
var router = express.Router();
const taskController = require('../controllers/tasks'); 

//Obtener todas las tareas
router.get('/getTasks', taskController.getAllTasks);
//Obtener la tarea por el id
router.get('/getTask/:id', taskController.getTaskById);
//Crear una tarea una tarea
router.post('/newTask', taskController.createTask);
//Actualizar una tarea
router.put('/updateTask/:id', taskController.updateTask);
//Eliminar una tarea
router.delete('/deleteTask/:id', taskController.deleteTask);
 
module.exports = router;
