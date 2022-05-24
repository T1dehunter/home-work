import {connect} from "./connection.js";

const getCountParam = (args) => {
    const param = args.find(item => item.startsWith('--count'));
    return Number(param.split('=')[1]);
};

const getIntervalParam = (args) => {
    const param = args.find(item => item.startsWith('--interval'));
    const value = param.split('=')[1];
    return Number(value.split('')[0]);
};

const getLimitParam = (args) => {
    const param = args.find(item => item.startsWith('--limit'));
    return Number(param.split('=')[1]);
};

const getRandomDate = () => {
    const fromTime = new Date('1950-02-12T01:57:45.271Z').getTime();
    const toTime = new Date('2022-02-12T01:57:45.271Z').getTime();
    const date = new Date(fromTime + Math.random() * (toTime - fromTime));
    const year = date.getUTCFullYear();
    const month = ('00' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('00' + date.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

const pause = (timeInSeconds) => new Promise(resolve => setTimeout(resolve, timeInSeconds * 1000));

const startAddUsers = async function({count, interval, limit, conn}) {
    console.log(`Interval: ${interval}s`);
    let createdCount = 0;
    while (createdCount < limit) {
        const diff = limit - createdCount;
        const currentCount = diff < count ? diff : count;
        const requests = Array.from({length: currentCount}).map(() => conn.createOneUser(getRandomDate()));

        await Promise.all(requests);

        await pause(interval);

        console.log(`Added ${currentCount} users`);

        createdCount += requests.length;
    }
    console.log(`All added users: ${createdCount}`);
};

const addUsers = async () => {
    const args = process.argv.slice(2);
    const params = {
        count: getCountParam(args),
        interval: getIntervalParam(args),
        limit: getLimitParam(args),
    };
    const client = await connect();

    const startTime = performance.now();

    await startAddUsers({count: params.count, interval: params.interval, limit: params.limit, conn: client});

    const endTime = performance.now()

    console.log(`Add users took ${(endTime - startTime) / 1000} seconds.`);
}

addUsers().catch((err) => {
    console.error(err);
    process.exit(1);
}).finally(() => {
    process.exit(0);
});