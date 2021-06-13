import axios from 'axios';

export class AuthClient {
    baseUrl: string;

    constructor(url: string) {
        this.baseUrl = url
    }

    async get(url: string) {
        const resp = await axios.get(`${this.baseUrl}`);
        return resp.data;
    }

    async delete(url: string) {
        const resp = await axios.delete(`${this.baseUrl}`);
        return resp.data;
    }

    async post(url: string, data: any) {
        const resp = await axios.post(`${this.baseUrl}`, data);
        return resp.data;
    }
    async put(url: string, data: any) {
        const resp = await axios.put(`${this.baseUrl}`, data);
        return resp.data;
    }
}
