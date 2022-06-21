export const getRandomDate = () => {
    const fromTime = new Date('1950-02-12T01:57:45.271Z').getTime();
    const toTime = new Date('2022-02-12T01:57:45.271Z').getTime();
    const date = new Date(fromTime + Math.random() * (toTime - fromTime));
    const year = date.getUTCFullYear();
    const month = ('00' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('00' + date.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
};