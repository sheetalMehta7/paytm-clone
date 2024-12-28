import axiosInstance from "./axiosInstance";

export const login = (data) => {
  return axiosInstance.post("/users/login", data);
};

export const signup = (data) => {
  return axiosInstance.post("/users/signup", data);
};
