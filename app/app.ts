import express from "express";
import { registerMiddlewares } from "./routes/routes";
import { sequelize } from "./connections/mysql.connect";

export const startServer = () => {

    const app = express();

    registerMiddlewares(app);

    const { PORT } = process.env;

    app.listen(
        PORT,
        () => console.log(`Server started on port ${3000}.`)
    )
}