import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import CardWrapper from "../components/CardWrapper";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Header from "../components/Header";
import { login } from "../api/auth";
import { loginValidationSchema } from "../validation/validationSchemas";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await login(values);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Login failed:", error.response?.data?.message || error);
        setErrors({ general: error.response?.data?.errorMessage || "Login failed" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <CardWrapper>
        <Header
          title="Login"
          subtitle="Welcome back! Please login to your account."
        />
        <form className="space-y-4 mt-6" onSubmit={formik.handleSubmit}>
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />
          {formik.errors.general && (
            <p className="text-red-500 text-sm">{formik.errors.general}</p>
          )}
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-300">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-yellow-400 hover:text-yellow-500">
            Sign up
          </Link>
        </p>
      </CardWrapper>
    </div>
  );
};

export default Login;
