import {connect} from './connection.js';

const getRandomDate = () => {
    const fromTime = new Date('1950-02-12T01:57:45.271Z').getTime();
    const toTime = new Date('2022-02-12T01:57:45.271Z').getTime();
    const date = new Date(fromTime + Math.random() * (toTime - fromTime));
    const year = date.getUTCFullYear();
    const month = ('00' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('00' + date.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

const createUsers = async () => {
    const client = await connect();
    await client.createDB();
    await client.createTB();
    const COUNT_USERS = 40_000_000;
    let batchedDates = [];
    for (let i = 0; i <= COUNT_USERS; i++) {
        const randomDate = getRandomDate();
        batchedDates.push(randomDate);
        if (batchedDates.length === 500_000) {
            await client.createManyUsers(batchedDates);
            console.log(`Created ${i + 1} users`)
            batchedDates = [];
        }
    }
}

createUsers().catch((err) => {
    console.error(err);
    process.exit(1);
}).finally(() => {
    process.exit(0);
});