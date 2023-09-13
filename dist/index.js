"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("./trpc");
const standalone_1 = require("@trpc/server/adapters/standalone");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./routers/user");
const todo_1 = require("./routers/todo");
mongoose_1.default.connect('mongodb+srv://user123:pass123@cluster0.3wysppf.mongodb.net/');
const appRouter = (0, trpc_1.router)({
    user: user_1.userRouter,
    todo: todo_1.todoRouter
});
const server = (0, standalone_1.createHTTPServer)({
    router: appRouter,
    middleware: (0, cors_1.default)(),
    createContext(opts) {
        let authHeader = opts.req.headers["authorization"];
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            console.log(token);
            return new Promise((resolve) => {
                jsonwebtoken_1.default.verify(token, "ANEESH", (err, payload) => {
                    if (payload) {
                        if (typeof payload === "string") {
                            return;
                        }
                        resolve({ userId: payload.userId, db: { Todo: db_1.Todo, User: db_1.User } });
                    }
                    else {
                        return {
                            db: { Todo: db_1.Todo, User: db_1.User },
                        };
                    }
                });
            });
        }
        return {
            db: { Todo: db_1.Todo, User: db_1.User },
        };
    }
});
server.listen(3008);
