import _ from 'lodash';

import {EVENT_NAME} from '../config.js';
import {redisConnect} from './redis-connect.js';

const DEBOUNCE_TIMEOUT = 10_000;

const getExecutionTimeInSeconds = (dateFrom, dateTo) => {
   return (dateTo.getTime() - dateFrom.getTime()) / 1000;
};

const calculateRps = (executionSeconds, countRequest) => {
    const eventPerSecond = countRequest / executionSeconds;
    return Number(eventPerSecond.toFixed(2));
}

const debounceCalculate = _.debounce((dateStart, eventsCounter) => {
    const now = new Date();
    const dateEnd = new Date(now.getTime() - DEBOUNCE_TIMEOUT);
    const executionSeconds = getExecutionTimeInSeconds(dateStart, dateEnd);
    const rps = calculateRps(executionSeconds, eventsCounter);

    console.log("Execution time: ", executionSeconds);
    console.log("Requests count: ", eventsCounter);
    console.log("RPS: ", rps);

    process.exit(0);
}, DEBOUNCE_TIMEOUT);

(async () => {
    const client = await redisConnect();

    let dateStart;
    let eventsCounter = 0;

    console.log('redis consumer started...');

    await client.subscribe(EVENT_NAME, (message) => {
        eventsCounter += 1;

        if (!dateStart) {
            dateStart = new Date();
        }

        console.log(`Event received ${EVENT_NAME} -> data received ${message}`);

        debounceCalculate(dateStart, eventsCounter);
    });
})();