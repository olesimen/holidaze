import { useContext } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";

const url = process.env.REACT_APP_BASE_URL;

export default function useAxios() {
    const [auth, setAuth] = useContext(AuthContext);

    const apiClient = axios.create({
        baseURL: url,
    });

    apiClient.interceptors.request.use(function (config) {
        const token = auth.jwt;
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
    });

    return apiClient;
}

// All code from js-frameworks/module-3/lesson-2
