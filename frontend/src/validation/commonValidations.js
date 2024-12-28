import * as Yup from "yup";

export const emailValidation = Yup.string()
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Invalid email address"
  )
  .required("Email is required");

export const passwordValidation = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .required("Password is required");

export const firstnameValidation = Yup.string().required("First Name is required");

export const lastnameValidation = Yup.string().required("Last Name is required");

export const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("Confirm password is required");
