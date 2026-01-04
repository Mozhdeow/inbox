import axios from "axios";

export const api=axios.create({
    baseURL:'/api',
    timeout:30000, // Increased to 30 seconds
})

