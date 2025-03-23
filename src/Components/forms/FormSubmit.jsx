import { useState } from 'react';
import API from '../../BackendAPi/ApiProvider';

/**
 * Custom hook to handle form submissions with API
 * @param {string} endpoint - API endpoint to submit to
 * @param {Object} options - Additional options
 * @returns {Object} - Form submission handlers and state
 */
export const useFormSubmit = (endpoint, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  
  // Set default options
  const {
    isMultipart = false,
    resetForm = () => {},
    onSuccess = () => {},
    successMessage = 'Form submitted successfully',
  } = options;
  
  const submitForm = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const config = {};
      
      // Set content type for multipart forms
      if (isMultipart) {
        config.headers = {
          'Content-Type': 'multipart/form-data',
        };
      }
      
      const response = await API.post(endpoint, data, config);
      
      setSuccess(successMessage);
      resetForm();
      onSuccess(response.data);
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    submitForm,
    loading,
    success,
    error,
    setError,
    setSuccess,
  };
};

export default useFormSubmit; 