"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

/**
 * useForm Custom Hook - Handles form state, validation, and submission
 * @param {Object} initialState - Initial form state
 * @param {Object} validationSchema - Validation schema
 * @returns {Object} - Form state, errors, isSubmitting, handleChange, handleSubmit
 */
const useForm = (
  initialState: { [key: string]: string },
  validationSchema: any
) => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle form input change
   * @param {ChangeEvent<HTMLInputElement>} e - Change event
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  /**
   * Validate form data
   * @returns {boolean} - Validation result
   */
  const validate = async () => {
    try {
      await validationSchema.validate(formState, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors: any) {
      const newErrors: { [key: string]: string } = {};
      validationErrors.inner.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  /**
   * Handle form submission
   * @param {FormEvent<HTMLFormElement>} e - Submit event
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isValid = await validate();
    if (isValid) {
      Swal.fire({
        title: "You registered successfully!",
        icon: "success",
        confirmButtonText: "Thanks",
      });
    }
    setIsSubmitting(false);
  };

  return {
    formState,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
