"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Todo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const todoSchema = new mongoose_1.default.Schema({
    todo: String,
    description: String,
    userId: String
});
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
});
exports.Todo = mongoose_1.default.models.Todo || mongoose_1.default.model('Todo', todoSchema);
exports.User = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
