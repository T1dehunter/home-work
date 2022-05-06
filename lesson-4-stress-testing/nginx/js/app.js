import {cities} from './cities.js';
import {logData} from './requests.js';

const formatCities = (cities) => {
    return Object.entries(cities).flatMap(([state, cities]) => {
        return cities.map(name => {
            return {name, state};
        })
    })
};

const getRandomCity = (cities) => {
    const formattedCities = formatCities(cities);
    const randomCity = formattedCities[Math.floor(Math.random() * formattedCities.length)];
    return randomCity;
};

(() => {
    console.log('START APP');

    const randomCity  = getRandomCity(cities);

    const userData = {
        userID: new Date().getTime(),
        userCity: randomCity.name,
        userState: randomCity.state,
    }

    logData(userData);
})();