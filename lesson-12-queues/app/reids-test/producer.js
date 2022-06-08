import {redisConnect} from './redis-connect.js';
import {APP_PORT, EVENT_NAME} from '../config.js';

const sendData = async (redisClient) => {
    for (let i = 1; i <= 100_000; i++) {
        const user = {id: i, date: new Date().toISOString()};
        await redisClient.publish(EVENT_NAME, JSON.stringify(user));
    }

    process.exit(0);
}

export const producer = async () => {
    const client = await redisConnect();

    console.log('Prepare send date to consumer...');

    setTimeout(() => {
        sendData(client);
    }, 1000);
};

(() => {
    producer();
})();