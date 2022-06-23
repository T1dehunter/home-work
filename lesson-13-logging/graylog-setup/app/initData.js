import {connect} from './connection.js';
import {getRandomDate} from './utils.js';

const initData = async () => {
    const client = await connect();

    await client.createDB();
    await client.createTB();

    for (let i = 0; i < 50_000; i++) {
        await client.createOneUser(getRandomDate());
    }

    console.log('Data initialized.');
};

initData().catch((err) => {
    console.error(err);
    process.exit(1);
}).finally(() => {
    process.exit(0);
});