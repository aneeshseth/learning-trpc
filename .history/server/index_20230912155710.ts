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
        if (!authHeader) {
            
        }
    }
});
   
server.listen(3008);