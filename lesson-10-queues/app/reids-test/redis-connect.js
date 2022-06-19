import {createClient} from 'redis';
import {REDIS_PORT} from '../config.js';

export const redisConnect = async () => {
    const client = createClient({
        url: `redis://:str0ng_passw0rd@localhost:${REDIS_PORT}`,
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    return client;
};
