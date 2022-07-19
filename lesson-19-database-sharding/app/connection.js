import pg from 'pg';

export const connect = async () => {
    const client = new pg.Client({
        user: 'postgres',
        password: 'example',
        database: 'postgres',
        port: 5000,
    });

    await client.connect();

    return client;
}