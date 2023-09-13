import { router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import mongoose from 'mongoose';
import jwt, { JwtPayload } from "jsonwebtoken";
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
                interface CustomJwtPayload extends JwtPayload {
                    userId: string;
                }
                return new Promise<{ db: { Todo: typeof Todo; User: typeof User }; userId?: string }>((resolve) => {
                    jwt.verify(token, "ANEESH", (err: Error, user: CustomJwtPayload) => {
                        if (user) {
                            resolve({ userId: user.userId, db: { Todo, User } });
                        } else {
                            // Handle the case when 'user' is falsy (e.g., error or invalid token)
                        }
                    });
                });
                
            })
        }
        return {
            db: {Todo, User},
        }
    }
});
   
server.listen(3008);