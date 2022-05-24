import {connect} from './connection.js';

const createBtreeIndex = async () => {
    const client = await connect();

    console.log('Start creation BTREE index: ', new Date().toISOString());

    await client.createBtreeIndex();

    console.log('End creation BTREE index: ', new Date().toISOString());
}

createBtreeIndex().catch((err) => {
    console.error(err);
    process.exit(1);
}).finally(() => {
    process.exit(0);
});