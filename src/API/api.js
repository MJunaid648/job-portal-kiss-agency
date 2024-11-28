import axios from "axios";
import { toast } from "react-toastify";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Request Interceptor to add the token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle expired tokens and refresh them
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token and retry if not retried before
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevents retry loop

      try {
        // Call your refresh token endpoint
        const res = await api.post("/refresh", {
          token: localStorage.getItem("refreshToken"),
        });
        const newAccessToken = res.data.accessToken;

        // Update accessToken in localStorage
        localStorage.setItem("accessToken", newAccessToken);

        console.log("asd");
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const registerUser = async ({ name, email, phone, password }) => {
  const res = await api.post("/register", { name, email, phone, password });
  // console.log(res);
  return res.data;
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await api.post(
      "/login",
      { email, password },
      { withCredentials: true }
    );
    // console.log(res.data.token);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred.";
    // console.error("Login failed:", errorMessage);
    toast.error(errorMessage);
    return Promise.reject(errorMessage);
  }
};

export const getProfile = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("No access token available");
  }
  try {
    const res = await api.get("/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred.";
    console.log(error);
    return Promise.reject(errorMessage);
  }
};

export const logOut = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken"); // Ensure token is retrieved for authorization

    const res = await api.post(
      "/logout",
      { withCredentials: true },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(res);
    toast.info(res.data.message);
    return true; // You may return a success message or response data
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Logout failed. Please try again.";
    console.log(error);
    return Promise.reject(errorMessage);
  }
};
