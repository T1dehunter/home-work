import { createClient } from 'redis';

export const connect = async () => {
    const client = createClient({
        url: 'redis://:str0ng_passw0rd@localhost:6379'
        // url: 'redis://localhost:6379'
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    return client;
};
