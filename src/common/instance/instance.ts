import axios from "axios";

const token = '85a09378-ec22-48da-8b91-58754b7c7c4e'
const apiKey = '93c5f09c-aff4-416b-940b-88765d768a00'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    }
})