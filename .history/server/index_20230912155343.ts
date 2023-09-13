import { router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import mongoose, { mongo } from 'mongoose';
import jwt from "jsonwebtoken";
import { User , Todo} from "./db";

mongoose.connect('mongodb+srv://kirattechnologies:iRbi4XRDdM7JMMkl@cluster0.e95bnsi.mongodb.net/admin?authSource=admin&replicaSet=atlas-ue73sj-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true');

// using trpc
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
                jwt.verify(token, SECRET, (err, user) => {
                    if (user) {
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
   
server.listen(3000);