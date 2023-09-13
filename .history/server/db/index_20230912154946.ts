import mongoose, { mongo } from "mongoose";

const todoSchema = new mongoose.Schema({
    todo: String,
    description: String,
    userId: String
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
  
export const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
  
export const User = mongoose.models.User || mongoose.model('User', userSchema);
