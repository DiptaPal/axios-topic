import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    // timeout: 1000,
});

const token = "ItComesFromLocalStorageOrCokkies";

// request interceptor
api.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor
api.interceptors.response.use(
    (response) => {
        // response.result = response.data;
        // response.data = null;
        return response;
    },
    (error) => {
        console.log(error);
        if (error.response) {
            //server error
            error.message = `Error from server: ${error.response.status} - message ${error.response.statusText}`;
        }
        return Promise.reject(error);
    }
);

export default api;
