import { publicProcedure, router } from "../trpc";
import { z } from 'zod';
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import { isLoggedIn } from "../middleware/userMiddleware";



export const todoRouter = router({
    createTodo: publicProcedure
    .input(z.object({
        todo: z.string(),
        description: z.string()
    }))
    .mutation(async (opts) => {
        const 
    })
})