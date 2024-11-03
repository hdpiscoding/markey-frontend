import axios from "axios";
import useLocalStorage from "./components/General/useLocalStorage";

const instance = axios.create({
    baseURL: "http://152.42.232.101:5050/api/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    }
});

const mediaInstance = axios.create({
    baseURL: "http://152.42.232.101:4099/media/",
    timeout: 10000,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    maxBodyLength: Infinity
});

instance.interceptors.request.use(
    (config) => {
        const tokenStorage = useLocalStorage('token');
        if (tokenStorage) {
            config.headers['Authorization'] = `Bearer ${tokenStorage.get()}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

mediaInstance.interceptors.request.use(
    (config) => {
        const tokenStorage = useLocalStorage('token');
        if (tokenStorage) {
            config.headers['Authorization'] = `Bearer ${tokenStorage.get()}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Kiểm tra lỗi
        if (error.response) {
            // Lỗi từ server (4xx, 5xx)
            console.error('API Error:', error.response);
            // Tùy chọn: Xử lý lỗi xác thực
            if (error.response.status === 401) {
                // Điều hướng đến trang login hoặc xử lý logout nếu token không hợp lệ
                window.location.href = '/login';
            }
        } else if (error.request) {
            // Không có phản hồi từ server
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export { instance, mediaInstance };