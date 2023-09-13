"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const userMiddleware_1 = require("../middleware/userMiddleware");
exports.todoRouter = (0, trpc_1.router)({
    createTodo: trpc_1.publicProcedure
        .use(userMiddleware_1.isLoggedIn)
        .input(zod_1.z.object({
        todo: zod_1.z.string(),
        description: zod_1.z.string()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const todo = opts.input.todo;
        const description = opts.input.description;
        const userId = opts.ctx.userId;
        const createTodo = yield opts.ctx.db.Todo.create({
            todo: todo,
            description: description,
            userId: userId
        });
        return {
            createTodo
        };
    }))
});
