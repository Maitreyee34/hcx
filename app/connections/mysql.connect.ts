import { Sequelize } from "sequelize";

const { MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DIALECT } = process.env;

export const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD,{
    host: MYSQL_HOST,
    dialect: MYSQL_DIALECT
})