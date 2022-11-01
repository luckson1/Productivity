import { UserTypes } from "./models/Users"
import { Request} from 'express';
import { BugTypes } from "./models/Bugs";

export interface TypedRequestBody extends Request {
  body: BugTypes;
    user?: UserTypes;
    file?: object
}