import { API_URL } from "../config";

export default class Server {
    constructor(path = "") {
        this.API_URL = API_URL;
        this.path = path;
    }
    
    send(req) {
        const path = `${this.API_URL}${this.path}${req.path}`;

        const headersObj = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        const token = localStorage.getItem('token');
        if (token) {
            headersObj.authorization = `Token ${token}`;
        }

        const headers = new Headers(headersObj);

        const options = {
            method: 'GET',
            ...req.options
        };

        options.headers = headers;

        const request = new Request(path, options);

        return fetch(request)
            .then(
                (response) => { 
                    return response.json()
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}
