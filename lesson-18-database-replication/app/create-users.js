import {connect} from './connection.js';

const getRandomDate = () => {
    const fromTime = new Date('1950-02-12T01:57:45.271Z').getTime();
    const toTime = new Date('2022-02-12T01:57:45.271Z').getTime();
    const date = new Date(fromTime + Math.random() * (toTime - fromTime));
    const year = date.getUTCFullYear();
    const month = ('00' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('00' + date.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
};

const getRandomAge = () => {
    const MIN_AGE = 20;
    const MAX_AGE = 100;
    return Math.floor(Math.random() * (MAX_AGE - MIN_AGE + 1) + MIN_AGE);
};

const createUsers = async () => {
    const client = await connect();
    await client.createDB();
    await client.createTB();
    const COUNT_USERS = 100_000;
    let usersBatch = [];
    for (let i = 0; i <= COUNT_USERS; i++) {
        const birthDate = getRandomDate();
        const age = getRandomDate();
        usersBatch.push({birthDate, age});
        if (usersBatch.length === 10_000) {
            await client.createManyUsers(usersBatch);
            console.log(`Created ${i + 1} batch users`);
            usersBatch = [];
        }
    }
}

createUsers().catch((err) => {
    console.error(err);
    process.exit(1);
}).finally(() => {
    process.exit(0);
});