import mysql from 'mysql2';

const TABLE_NAME = 'home_work_18.users';

const getClient = (connection) => {
    return {
        createManyUsers: (users) => {
            const values = users.map(user => `('${user.birthDate}', '${user.age}')`).join(', ');
            const sql =`INSERT INTO ${TABLE_NAME}(birthDate, age) VALUES ${values}`;
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