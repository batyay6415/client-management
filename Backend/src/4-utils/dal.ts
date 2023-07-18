import mysql from "mysql";
import appConfig from "./app-config";

// Create a connection to MySQL's northwind database:
const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Execute any sql: 
function execute(sql: string, values?: any[]): Promise<any> {

    // Promisify:
    return new Promise<any>((resolve, reject) => {

        // Execute query in database:
        connection.query(sql, values, (err, result) => {

            // If query failed:
            if(err) {
                reject(err);
                return;
            }

            // Query succeeded:
            resolve(result);

        });
    });
}

export default {
    execute
};