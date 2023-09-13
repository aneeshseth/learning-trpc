import { publicProcedure, router } from "../trpc";
import { z } from 'zod';
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import { isLoggedIn } from "../middleware/userMiddleware";


export const userRouter = router({
    signUp: publicProcedure
    .input(z.object({
        username: z.string(),
        password: z.string()
    }))
    .mutation(async (opts) => {
        const username = opts.input.username;
        const password = opts.input.password;
        const existingUser = await opts.ctx.db.User.find({username: username})
        if (existingUser.length > 0) {
            return;
        }
        const newUser = await opts.ctx.db.User.create({
            username: username,
            password: password
        })
    })
})