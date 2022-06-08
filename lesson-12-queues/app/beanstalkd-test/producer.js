import {beanstalkdConnect} from './beanstalkd-connect.js';

const sendData = async (beanstalkdClient) => {
    for (let i = 1; i <= 100_000; i++) {
        const user = {id: i, date: new Date().toISOString()};
        await beanstalkdClient.put(user);
    }

    process.exit(0);
}

export const producer = async () => {
    const client = await beanstalkdConnect();

    console.log('Prepare send date to consumer...');

    setTimeout(() => {
        sendData(client);
    }, 1000);
};

(() => {
    producer();
})();