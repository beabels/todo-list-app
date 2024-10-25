import { Schema, model } from "mongoose";

const todoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false  
    }
});

const Todo = model('Todo', todoSchema);

export default Todo;
