
import { HttpClient } from "./httpClient";
interface IRegister {
    name:string;
    surname:string;
    email: string;
    password: string;
}
class RegisterService extends HttpClient {
    constructor() {
        super('http://172.28.0.99:8080/authenticate');
    }
    public loginSubsc = (register: IRegister): Promise<void> => {
        return this.post('', register);
    }
}

export const registerService = new RegisterService();