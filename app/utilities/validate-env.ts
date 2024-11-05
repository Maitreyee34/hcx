import { config } from "dotenv";
import { Dialect } from "sequelize";

interface IEnvValidation {
    PORT: number;
    MYSQL_DATABASE: string;
    MYSQL_USERNAME: string;
    MYSQL_PASSWORD: string;
    MYSQL_HOST: string;
    MYSQL_DIALECT: Dialect;
    PUBLIC_KEY: string;
    PRIVATE_KEY: string;
    CONTENT_ALGORITHM: string;
    ALGORITHM: string;
    FORMAT: 'compact';
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends IEnvValidation{}
    }
}

export const validateEnv = () => {
    config();
}