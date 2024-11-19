import axios from "axios";

const apiAxios = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

apiAxios.interceptors.request.use((config) => {
  const token = process.env.EXPO_PUBLIC_API_KEY;
  if (token) {
    const params = new URLSearchParams(config.params || {});
    params.append("appid", token);
    config.params = params;
  }
  return config;
});

apiAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status >= 200 && status < 600) {
        return Promise.resolve(error.response);
      }
    }
    return Promise.reject(error);
  },
);

export default apiAxios;
