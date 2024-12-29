import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardWrapper from '../components/CardWrapper';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Header from '../components/Header';
import { useFormik } from 'formik';
import axios from '../api/axiosInstance';
import { signupValidationSchema } from '../validation/validationSchemas';
import { signupFields } from '../util/formFields'; // Import field configuration

const Signup = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (values, { setSubmitting, setErrors }) => {
    const { confirmPassword, ...restData } = values;
    try {
      const response = await axios.post('/users/signup', restData);
      if (response.status === 200) {
        setSuccessMessage('Signup Successful! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error);
      setErrors({ general: error.response?.data?.message || 'Signup failed' });
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: signupFields.reduce((acc, field) => {
      acc[field.id] = '';
      return acc;
    }, {}),
    validationSchema: signupValidationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <CardWrapper>
        {successMessage ? (
          <div className="text-center min-h-40 min-w-xl flex justify-center items-center">
            <h2 className="text-2xl font-bold text-green-500">{successMessage}</h2>
          </div>
        ) : (
          <>
            <Header
              title="Sign Up"
              subtitle="Create your account and start your journey with us."
            />
            <form className="space-y-4 mt-6" onSubmit={formik.handleSubmit}>
              {signupFields.map((field) => (
                <InputField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  value={formik.values[field.id]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[field.id] && formik.errors[field.id]}
                />
              ))}
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
          </>
        )}
      </CardWrapper>
    </div>
  );
};

export default Signup;
