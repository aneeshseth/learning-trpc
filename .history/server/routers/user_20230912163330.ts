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
        const token: string = jwt.sign({id: newUser._id}, "ANEESH", {expiresIn: "1d"})
        return {
            token
        }
    }),
    logIn: publicProcedure
    .input(z.object({
        username: z.string(),
        password: z.string()
    }))
    .mutation(async (opts) => {
        const username = opts.input.username;
        const password = opts.input.password;
        const existingUser = await opts.ctx.db.User.find({username: username})
        if (existingUser.length == 0) {
            return;
        }
        const checkPassword = password === existingUser[0].password;
        let token;
        if (checkPassword) 
        { token = jwt.sign({id: existingUser[0]._id}, "ANEESH", {expiresIn: "1d"})
        }
        else { return; }
       
        return {
            token
        }
    }),
    me: publicProcedure
    .use(isLoggedIn)
    .query(async (opts) => {
        const userId = opts.ctx.userId;
        const findUser = await opts.ctx.db.User.findById(userId);
        return {
            findUser
        }
    })
})