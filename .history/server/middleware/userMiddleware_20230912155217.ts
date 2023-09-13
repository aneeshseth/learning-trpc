import { TRPCError } from '@trpc/server';
import { middleware } from "../trpc";


export const isLoggedIn = middleware(async (opts) => {
    const { ctx } = opts;
    if (!ctx.userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    
    return opts.next();
})