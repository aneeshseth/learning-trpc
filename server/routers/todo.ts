import { publicProcedure, router } from "../trpc";
import { z } from 'zod';
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import { isLoggedIn } from "../middleware/userMiddleware";



export const todoRouter = router({
    createTodo: publicProcedure
    .use(isLoggedIn)
    .input(z.object({
        todo: z.string(),
        description: z.string()
    }))
    .mutation(async (opts) => {
        const todo = opts.input.todo;
        const description = opts.input.description
        const userId = opts.ctx.userId;
        const createTodo = await opts.ctx.db.Todo.create({
            todo: todo,
            description: description,
            userId: userId
        })
        return {
            createTodo
        }
    })
})