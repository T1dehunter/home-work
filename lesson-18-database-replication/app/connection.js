import mysql from 'mysql2';

const TABLE_NAME = '`home-work-18`.users';

const getClient = (connection) => {
    return {
        createManyUsers: (users) => {
            const values = users.map(user => `('${user.birthDate}', '${user.age}')`).join(', ');
            const sql =`INSERT INTO ${TABLE_NAME}(birth_date, age) VALUES ${values}`;
            return new Promise((resolve, reject) => {
                connection.query(sql, function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
        },
    }
}

export const connect = async () => {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: 'localhost',
            port: '3307',
            user: "root",
            password: "root",
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