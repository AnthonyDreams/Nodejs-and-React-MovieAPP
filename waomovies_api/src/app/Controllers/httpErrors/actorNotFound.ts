import { HttpError } from "routing-controllers";
 
export class ActorNotFoundError extends HttpError {
    constructor() {
        super(404, "Actor not found!");
    }
}