import {connect} from './connection.js';

const getRandomYear = () => {
    const start = 1900;
    const end = 2022;
    return Math.floor(Math.random() * (start - end + 1) + end);
};

const getRandomTitle = (bookID) => {
    return `Author_${bookID}`;
};

const getRandomAuthor = (bookID) => {
    return `Title_${bookID}`;
};

const getRandomCategory = () => {
    const categories = [1, 2, 3];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    return randomCategory;
};

const createBooks = async () => {
    const client = await connect();

    const startAddUsers = performance.now();

    for (let i = 1; i <= 1_000_000; i++) {
        const book = {id: i, category: getRandomCategory(), author: getRandomAuthor(i), title: getRandomTitle(i), year: getRandomYear()};
        await client.query(`INSERT INTO books VALUES (${book.id}, ${book.category}, '${book.author}', '${book.title}', ${book.year})`);
    }

    const endAddUsers = performance.now();

    const res = await client.query('SELECT COUNT(id) FROM books');


    console.log('Count inserted books: ', res.rows[0].count);
    console.log(`Insertion took: ${(endAddUsers - startAddUsers) / 1000} seconds.` );
}

createBooks().catch((err) => {
    console.error(err);
    process.exit(1);
}).finally(() => {
    process.exit(0);
});