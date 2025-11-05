import axios from 'axios';

const URL:string = "http://localhost";
const PORT:string = "5000";

const baseUrl:string = `${URL}:${PORT}`;

const monitorApi = axios.create({
    baseURL: baseUrl
});

export default monitorApi;
