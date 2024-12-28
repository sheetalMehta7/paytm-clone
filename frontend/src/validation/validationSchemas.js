import * as Yup from "yup";
import {
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
  lastnameValidation,
  firstnameValidation,
} from "./commonValidations";

// Login Validation Schema
export const loginValidationSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation,
});

// Signup Validation Schema
export const signupValidationSchema = Yup.object({
  firstname: firstnameValidation,
  lastname: lastnameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});
