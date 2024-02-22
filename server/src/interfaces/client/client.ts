import {Dictionary} from "code-config";
import {User} from "../../futures/user/shemas/user.schema";

export interface Client {
    headers: Dictionary<string>;
    user: User;
}