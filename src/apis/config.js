
import axios from "axios";
import { API_URL } from "../constants";
import {
    getLocalToken,
    getLocalRefreshToken,
    setLocalToken,
} from "./storage";
import { message } from "antd";
const instance = axios.create({
    baseURL: API_URL,
    timeout: 100000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": API_URL,
    },
});

instance.interceptors.request.use((res) => {
    let token = getLocalToken();
    if (token) {
        res.headers.token = token;
    }
    return res;
});

instance.setToken = (token) => {
    instance.defaults.headers["token"] = + token;
    setLocalToken(token);
};

function refreshToken() {
    const refreshToken = getLocalRefreshToken();
    if (refreshToken) {
        return instance.post("auth/refresh", {
            refreshToken,
        });
    }
    return null;
}
instance.interceptors.response.use(
    (res) => {
        if (res.data.code === 401 && getLocalRefreshToken()) {
            return refreshToken()
                ?.then((rs) => {
                    instance.setToken(rs.data.accessToken);
                    const config = res.config;
                    config.headers["Authorization"] = "Bearer " + rs.data.accessToken;
                    return instance(config);
                })
                ?.catch(console.log);
        }
        if(res?.data?.message) {
            message.success(res.data.message);
        }
        return res;
    },
    (err) => {
        if(err?.response?.data?.message) {
            message.error(err?.response?.data?.message);
        }
        if (err.status === 401) {
            localStorage.clear();
            setTimeout(() => {
                location.reload();
            }, 200);;
        }
    }
);

export default instance;