import mysql from 'mysql2';

const DB_NAME = 'home_work_13';
const TABLE_NAME = 'home_work_13.users';

const getClient = (connection) => {
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
                connection.query(`CREATE TABLE ${TABLE_NAME}(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, birthDate Date)`, function (err, result) {
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
        findUserByDate: (date) => {
            const sql = `SELECT * FROM ${TABLE_NAME} WHERE birthDate="${date}"`;
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Result: ", result);
            });
        },
    }
}

export const connect = async () => {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: 'localhost',
            port: '4000',
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