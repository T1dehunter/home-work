const TTL_IN_MS = 20;

export const cacheWrapper = (redisClient) => {
    const getRandomNumberFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const getExpirationInPercents = (item) => {
        const now = new Date().getTime();
        const timeToExpire = item.expireAt - now;
        const expireInPercents = 100 - parseFloat((timeToExpire / TTL_IN_MS).toPrecision(1)) * 100;
        return expireInPercents;
    };

    const isCacheProbabilisticExpired = (item) => {
        const expireInPercents = getExpirationInPercents(item);
        const percentsRoll = getRandomNumberFromInterval(1, 100);

        return expireInPercents >= percentsRoll;
    };

    const getValue = async (key) => {
        const item = JSON.parse(await redisClient.get(key));

        if (!item) {
            return;
        }


        if (isCacheProbabilisticExpired(item)) {
            await redisClient.del(key);
            return;
        }

        return item.value;
    };

    const setValue = async (key, value) => {
        const now = new Date().getTime();
        const expireAt = now + TTL_IN_MS;
        const data = {value, expireAt};
        const jsonData = JSON.stringify(data);
        await redisClient.set(key, jsonData, {PX: TTL_IN_MS});
    };

    const delValue = async (key) => {
        await redisClient.del(key);
    };

    return {
        get: getValue,
        set: setValue,
        del: delValue,
    }
}
