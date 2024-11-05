import { Router } from "express";

export class Route {
    private static routes: Route[] = [];

    constructor(
        public path: string,
        public router: Router
    ){
        if(!this.path.startsWith("/")){
            throw "Path should start with a /.";
        }

        if(Route.routes.find(route => this.path === route.path )){
            throw `Path ${this.path} already exists.`;
        }

        Route.routes.push(this);
    }
}