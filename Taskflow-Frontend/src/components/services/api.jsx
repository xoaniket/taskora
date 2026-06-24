import axios from "axios"; //custom Axios instance so you don't have to write the full backend URL every time

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // start with this URL whenever u make request
});

//Request interceptor
api.interceptors.request.use(
  (config) => {
    if (config.url?.includes("accounts/login/")) {
      return config;
    }
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error), //PROMISE Built-in JavaScript object, REJECT() pass error forward
);

//token refresh interceptor..........................
api.interceptors.response.use(
  (response) => response, //If request succeeded don't change anything
  async (error) => {
    const orignalRequest = error.config;

    if (error.response?.status === 401 && !orignalRequest._retry) {
      //401 token expire or u haven't retired yet?
      orignalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh: refreshToken,
          },
        );

        const newAccessToken = response.data.access;

        localStorage.setItem("accessToken", newAccessToken);

        orignalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(orignalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/"; //prededfined browser feaurture

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
