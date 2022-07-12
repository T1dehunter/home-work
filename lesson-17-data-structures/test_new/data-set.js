const getRandomNumberFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export class DataSet {
    static generate(count) {
        const multiplier = 50_000;
        const result = [];
        const result1 = [];
        for (let i = 1; i <= count; i++) {
            const dataSetSize = (i * multiplier);
            const listNumbers = Array.from({length: dataSetSize}).map(() => getRandomNumberFromInterval(1, dataSetSize))
            result.push(listNumbers);
            // result1.push(dataSetSize);
        }
        return result;
        // return result1;
    }
}