import {cities} from './cities.js';
import {states} from './states.js';
import {connect} from './connect.js';

const getRandomCity = (cities) => cities[Math.floor(Math.random() * cities.length)];

const calculateState = (city, states) => {
    const [state] = Object.entries(states).find(([state, cities]) => {
        return cities.includes(city);
    });
    return state;
};

(async () => {
    console.log('App started...');
    console.time('calculate');

    const client = await connect();
    const uniqCities = [...new Set(cities)];
    let cacheHitCount = 0;

    for (let i = 0; i < 900 ; i++) {
        const randomCity = getRandomCity(uniqCities);
        const data = await client.get(randomCity);

        if (data) {
            cacheHitCount += 1;
        } else {
            const state = calculateState(randomCity, states);
            await client.set(randomCity, state);
        }
    }

    console.timeEnd('calculate');
    console.log('Cache hits: ', cacheHitCount);

    await client.del(uniqCities);

    process.exit(0);
})();
