import axios from "axios";

interface userDto {
  email: string;
  password: string;
}
interface oAuthDto {
  oAuthToken: string;
}

interface historyDto {
  user1: string;
  user2: string;
}

export const useApi = () => {
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: config.public.apiUrl
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // 如果 token 存在，就在 Authorization Header 中攜帶
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  });

  return {
    createUser: (data: userDto) => instance.post("/users", data),
    isAuth: () => instance.get("/users/isAuth"),
    signin: (data: userDto) => instance.post("/users/signin", data),
    google_signin: (data: oAuthDto) => instance.post("/users/google_signin", data),
    getHistory: (data: historyDto) => instance.post("/chat/history", data),
    getChatList: () => instance.get("/chat/list")
  };
};
