import fetch from 'node-fetch';

import {MEASUREMENT_ID, CLIENT_ID, API_SECRET} from '../../config.js';

export const fetchStarWarsCharacter = async (charNumber) => {
    const response = await fetch(`https://swapi.dev/api/people/${charNumber}`);
    const data = await response.json();
    return data;
};

const getRandomCharacterNumber = () => {
    const min = 1;
    const max = 10;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const pause = () => new Promise(resolve => setTimeout(resolve, 1000));

export const fetchNextStarWarsCharacter = async function*() {
    const MAX_COUNT = 10;
    let CURRENT_STEP = 1;
    while (CURRENT_STEP <= MAX_COUNT) {
        const randomCharNumber = getRandomCharacterNumber();
        const character = await fetchStarWarsCharacter(randomCharNumber);
        yield character;
        CURRENT_STEP += 1;
        await pause();
    }
};

export const postEventToGA = async ({eventName, eventData}) => {
    return fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`, {
        method: "POST",
        body: JSON.stringify({
            client_id: CLIENT_ID,
            events: [{
                name: eventName,
                params: eventData,
            }]
        })
    });
};