import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'xxxx', // entorno local
    user: 'xxxx', // Usuario de MySQL
   // password: en caso de tener
    database: 'prueba_db', //ingrese el nombre de la base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
