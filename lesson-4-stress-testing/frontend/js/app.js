import {getUserData} from './requests.js';

const getUsersIds = () => {
    return Array.from({length: 1000}).map((_, index) => index + 1);
};

const getRandomUserID = () => {
    const usersIds = getUsersIds();
    const randomCity = usersIds[Math.floor(Math.random() * usersIds.length)];
    return randomCity;
};

(() => {
    console.log('START APP');

    const randomUserID = getRandomUserID();

    getUserData(randomUserID);
})();