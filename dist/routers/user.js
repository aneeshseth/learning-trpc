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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = require("@trpc/server");
const userMiddleware_1 = require("../middleware/userMiddleware");
exports.userRouter = (0, trpc_1.router)({
    signUp: trpc_1.publicProcedure
        .input(zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const username = opts.input.username;
        const password = opts.input.password;
        const existingUser = yield opts.ctx.db.User.find({ username: username });
        if (existingUser.length > 0) {
            return;
        }
        const newUser = yield opts.ctx.db.User.create({
            username: username,
            password: password
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, "ANEESH", { expiresIn: "1d" });
        return {
            token
        };
    })),
    logIn: trpc_1.publicProcedure
        .input(zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const username = opts.input.username;
        const password = opts.input.password;
        const existingUser = yield opts.ctx.db.User.find({ username: username });
        if (existingUser.length == 0) {
            return;
        }
        const checkPassword = password === existingUser[0].password;
        let token;
        if (checkPassword) {
            token = jsonwebtoken_1.default.sign({ id: existingUser[0]._id }, "ANEESH", { expiresIn: "1d" });
        }
        else {
            return;
        }
        return {
            token
        };
    })),
    me: trpc_1.publicProcedure
        .use(userMiddleware_1.isLoggedIn)
        .query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = opts.ctx.userId;
        const findUser = yield opts.ctx.db.User.findById(userId);
        if (!findUser) {
            return new server_1.TRPCError({ code: "UNAUTHORIZED" });
        }
        return {
            findUser
        };
    }))
});
