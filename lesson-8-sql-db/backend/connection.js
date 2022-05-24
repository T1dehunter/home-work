import mysql from 'mysql2';

const DB_NAME = 'home_work_8';
const TABLE_NAME = 'home_work_8.users';
const INDEX_NAME = 'user_birth_date_idx';

const getClient = (connection) => {
    const isIndexExists = () => {
        return new Promise((resolve, reject) => {
            connection.query(`SHOW INDEX FROM ${TABLE_NAME} WHERE Column_name = 'birthDate'`, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result.length > 0);
            });
        });
    }
    const dropIndex = () => {
        return new Promise((resolve, reject) => {
            connection.query(`ALTER TABLE ${TABLE_NAME} DROP INDEX ${INDEX_NAME}`, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
    return {
        createDB: () => {
            return new Promise((resolve, reject) => {
                connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
        },
        createTB: () => {
            return new Promise((resolve, reject) => {
                connection.query(`CREATE TABLE ${TABLE_NAME}(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, birthDate Date) ENGINE = MEMORY`, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
        },
        createOneUser: async (birthDate) => {
            const sql =`INSERT INTO ${TABLE_NAME} SET birthDate='${birthDate}'`;
            return new Promise((resolve, reject) => {
                connection.query(sql, function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
        },
        createManyUsers: (usersBirthDates) => {
            const dateValues = usersBirthDates.map(date => `('${date}')`).join(', ');
            const sql =`INSERT INTO ${TABLE_NAME}(birthDate) VALUES ${dateValues}`;
            return new Promise((resolve, reject) => {
                connection.query(sql, function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
        },
        findOneUserByID: (id) => {
            const sql = `SELECT * FROM ${TABLE_NAME} WHERE id=${id}`;
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Result: " + result);
            });
        },
        createBtreeIndex: async () => {
            if (await isIndexExists()) {
                await dropIndex();
            }

            return new Promise((resolve, reject) => {
                const sql = `CREATE INDEX ${INDEX_NAME} ON ${TABLE_NAME}(birthDate) USING BTREE`;
                connection.query(sql, function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
        },
        createHashIndex: async () => {
            if (await isIndexExists()) {
                await dropIndex();
            }

            return new Promise((resolve, reject) => {
                const sql = `CREATE INDEX ${INDEX_NAME} ON ${TABLE_NAME}(birthDate) USING HASH`;
                connection.query(sql, function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
        }
    }
}

export const connect = async () => {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: "root",
            password: "",
        });

        con.connect(async function(err) {
            if (err) {
                reject(err);
            }

            const client = getClient(con);

            resolve(client);
        });
    })

}