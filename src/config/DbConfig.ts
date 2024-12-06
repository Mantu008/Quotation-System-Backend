import mariadb from 'mariadb';
import 'dotenv/config';

const env = process.env;


const connPool = mariadb.createPool({
	host: env.DB_HOST,
	user: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_NAME,
	port: parseInt(env.DB_PORT ?? "3306"),
	connectionLimit: 1
});

export default connPool;