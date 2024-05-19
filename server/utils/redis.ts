import { Redis } from "ioredis";
import { REDIS_URL } from "../example.env";

require('dotenv').config()

const redisClient = () => {
    if(REDIS_URL){
        console.log("Redis connected!")
        return REDIS_URL
    }
    throw new Error("Redis Connection Failed!")
}

export const redis = new Redis(redisClient())