import axios from "axios";


const request = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    timeout: 600000,    // ~~6p
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
    },

})

// custom get method of instance axios
export const get = async (path: string, options = {}) => {
    const response = await request.get(path, options);

    return response.data;
}

// custom post method of instance axios
export const post = async (path: string, data: any, options = {}) => {
    const response = await request.post(path, data, options);
    return response.data;
};

// custom delete method of instance axios
export const del = async (path: string, options = {}) => {
    const response = await request.delete(path, options);
    return response.data;
};

// custom put method of instance axios
export const put = async (path: string, data: any, options = {}) => {
    const response = await request.put(path, data, options);
    return response.data;
};


export default request;
