"use client";
import { useState } from "react";
import Swal from "sweetalert2";

const useForm = (initialState: any, validationSchema: any) => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validate = async () => {
    try {
      await validationSchema.validate(formState, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors: any) {
      const newErrors: any = {};
      validationErrors.inner.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isValid = await validate();
    if (isValid) {
      Swal.fire({
        title: "Good job",

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
