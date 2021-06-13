import axios from 'axios';

export class HttpClient {
    baseUrl: string;

    constructor(url: string) {
        this.baseUrl = url
    }

    async get(url: string) {
        const resp = await axios.get(`${this.baseUrl}/${url}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Access-Control-Allow-Origin": "*",
            }
        });
        return resp.data;
    }

    async delete(url: string) {
        const resp = await axios.delete(`${this.baseUrl}/${url}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Access-Control-Allow-Origin": "*"
            }
        });
        return resp.data;
    }

    async post(url: string, data: any) {
        const resp = await axios.post(`${this.baseUrl}/${url}`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Access-Control-Allow-Origin": "*",
            }
        });
        return resp.data;
    }
    async put(url: string, data: any) {
        const resp = await axios.put(`${this.baseUrl}/${url}`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Access-Control-Allow-Origin": "*",
            }
        });
        return resp.data;
    }
}
