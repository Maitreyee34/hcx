import { Application, NextFunction, Request, Response, json } from "express";
import { routes } from "./routes.data";
import { ResponseHandler } from "../utilities/response-handler";

export const registerMiddlewares = ( app: Application ) => {

    app.use(json());

    for(let route of routes){
        console.log(route.path, route.router)
        app.use(route.path, route.router);
    }

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
    })
}