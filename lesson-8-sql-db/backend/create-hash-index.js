import {connect} from './connection.js';

const createHashIndex = async () => {
    const client = await connect();

    console.log('Start creation HASH index: ', new Date().toISOString());

    await client.createHashIndex();

    console.log('End creation HASH index: ', new Date().toISOString());
}

createHashIndex().catch((err) => {
    console.error(err);
    process.exit(1);
}).finally(() => {
    process.exit(0);
});