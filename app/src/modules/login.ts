
import { HttpClient } from "./httpClient";
interface ISign {
    email: string;
    password: string;
}
interface ILoginResponse {
    token: string;
}
class LoginService extends HttpClient {
    constructor() {
        super('http://172.28.0.99:8080/authenticate');
    }
    public loginSubsc = (login: ISign): Promise<ILoginResponse> => {
        return this.post('', login);
    }
}

export const loginService = new LoginService();