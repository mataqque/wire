require('dotenv').config();
console.log(process.env.HOST_DATABASE);
export const database = {
	host: process.env.HOST_DATABASE,
	user: process.env.USER_DATABASE,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	port: 3306,
	decimalNumbers: true,
};
