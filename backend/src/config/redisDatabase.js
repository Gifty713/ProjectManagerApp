import {createClient} from "redis";

const redisClient = createClient({
    username: "default",
    password:process.env.REDISPWD,
    socket: {
        host: 'monumental-slow-spirited-37578.db.redis.io',
        port: 10105,
        connectTimeout: 10000
    }
})

redisClient.on('error', err =>{
    console.log('Redis Client Error', err)
    process.exit(1);
});

await redisClient.connect();

export default redisClient;