import { router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import { User , Todo} from "./db";
import cors from 'cors'

mongoose.connect('mongodb+srv://user123:pass123@cluster0.3wysppf.mongodb.net/');


const appRouter = router({
});


export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
    middleware: cors(),
    createContext(opts) {
        let authHeader = opts.req.headers["authorization"];
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            console.log(token);
            return new Promise<{db: {Todo: typeof Todo, User: typeof User}, userId?: string}>((resolve) => {
                jwt.verify(token, "ANEESH", (err, user) => {
                    if (user) {
                        if (typeof user === )
                        resolve({userId: user.userId as string, db: {Todo, User}});
                    } else {
                        resolve({db: {Todo, User}});
                    }
                });
            })
        }
        return {
            db: {Todo, User},
        }
    }
});
   
server.listen(3008);