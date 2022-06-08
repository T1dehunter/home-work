import Jackd from 'jackd';

export const beanstalkdConnect = async () => {
    const beanstalkd = new Jackd();

    await beanstalkd.connect();

    return beanstalkd;
};
