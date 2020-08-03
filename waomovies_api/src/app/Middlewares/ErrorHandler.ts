import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";
const globalHandler = require("../Controllers/errorController")
@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

    error(error: any, request: any, response: any, next: (err: any) => any) {
        next(globalHandler(error, request, response, next));
    }

}