import React from 'react';
import { Link } from 'react-router-dom';
import CardWrapper from '../components/CardWrapper';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Header from '../components/Header';
import { useFormik } from 'formik';
import axios from '../api/axiosInstance'; // Import your axiosInstance
import { signupValidationSchema } from '../validation/validationSchemas';

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
        const {confirmPassword, ...restData} = values;
      try {
        const response = await axios.post('/users/signup', restData); 
        if (response.status === 201) {
          console.log('Signup Successful!');
        }
      } catch (error) {
        console.error('Signup failed:', error.response?.data?.message || error);
        setErrors({ general: error.response?.data?.message || 'Signup failed' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <CardWrapper>
        <Header
          title="Sign Up"
          subtitle="Create your account and start your journey with us."
        />
        <form className="space-y-4 mt-6" onSubmit={formik.handleSubmit}>
          <InputField
            id="firstname"
            label="First Name"
            placeholder="Enter your first name"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstname && formik.errors.firstname}
          />
          <InputField
            id="lastname"
            label="Last Name"
            placeholder="Enter your last name"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastname && formik.errors.lastname}
          />
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
            placeholder="Create a password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />
            <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Re-type password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          {formik.errors.general && (
            <p className="text-red-500 text-sm">{formik.errors.general}</p>
          )}
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:text-yellow-500">
            Log in
          </Link>
        </p>
      </CardWrapper>
    </div>
  );
};

export default Signup;
