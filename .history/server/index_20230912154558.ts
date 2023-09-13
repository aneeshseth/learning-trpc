import { router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import mongoose, { mongo } from 'mongoose';
import jwt from "jsonwebtoken";