import {cities as data} from './cities.js';
import {processCities} from './requests.js';
import {initView} from './view.js';

const formatCities = (cities) => {
    return Object.entries(cities).flatMap(([state, cities]) => {
        return cities.map(name => {
            return {city: name, state};
        })
    })
};

const getRandomCities = ({cities, randomItemsLength}) => {
    const result = [];
    for (let i = 1; i <= randomItemsLength; i++) {
        const randomItem = cities[Math.floor(Math.random() * cities.length)];
        result.push(randomItem);
    }
    return result;
};

const initHighLoad = () => {
    let intervalID;
    return {
        startHighLoad: () => {
            let itemsCount = 5;
            const cities = formatCities(data);
            intervalID = window.setInterval(() => {
                const randomCities = getRandomCities({cities, randomItemsLength: itemsCount});
                processCities(randomCities);
                itemsCount += 5;
            }, 1500);
        },
        stopHighLoad: () => window.clearInterval(intervalID),
    }
};

(() => {
    console.log('START APP');

    const {startHighLoad, stopHighLoad} = initHighLoad();

    initView({startHighLoad, stopHighLoad});
})();