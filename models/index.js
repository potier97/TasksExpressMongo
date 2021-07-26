var {  Schema, model } = require('mongoose'); 

const tackSchema = new Schema({  
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    },
    hide: {
        type: Boolean,
        required: true,
    }},
    { 
        timestamps: true,
        versionKey: false,
});


module.exports = model('task', tackSchema);