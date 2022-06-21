import {connect} from "./connection.js";
import {getRandomDate} from "./utils.js";

const pause = (timeInSeconds) => new Promise(resolve => setTimeout(resolve, timeInSeconds * 1000));

const searchData = async () => {
    const client = await connect();

    for (let i = 1; i <= 100_000; i++) {
        await client.findUserByDate(getRandomDate());
        await pause(1);
    }
}

searchData().catch((err) => {
    console.error(err);
    process.exit(1);
}).finally(() => {
    process.exit(0);
});