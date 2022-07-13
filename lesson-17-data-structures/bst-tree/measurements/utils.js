export const getRandomItemFromArray = (arr) => {
    const item = arr[Math.floor(Math.random() * arr.length)];
    return item;
};