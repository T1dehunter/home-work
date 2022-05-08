import {getUserData} from './requests.js';

const getUsersIds = () => {
    return Array.from({length: 1000}).map((_, index) => index + 1);
};

const getRandomUserID = () => {
    const usersIds = getUsersIds();
    const randomID = usersIds[Math.floor(Math.random() * usersIds.length)];
    return randomID;
};

(() => {
    console.log('START APP');

    const randomUserID = getRandomUserID();

    getUserData(randomUserID);
})();