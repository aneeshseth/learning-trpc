import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo: String,
    description: String,
    userId: {
        type: String,
        default: Math.random()*397232
    }
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
  
export const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
  
export const User = mongoose.models.User || mongoose.model('User', userSchema);
