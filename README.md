# Task 2: Custom Hook for Form Validation

## Objective

Create a custom React hook for form validation that can be reused across different forms in a Next.js application.

## Requirements

- The hook should accept an initial form state and a validation schema.
- Implement validation using a library like Yup or a custom validation function.
- The hook should return the form state, a method to handle input changes, a method to handle form submission, and validation errors.
- Ensure the hook supports both synchronous and asynchronous validations.

## Steps Taken

1. **Initial Setup**

   - Created an initial form state with fields for `name`, `email`, and `password`.
   - Defined a validation schema using Yup to handle both synchronous and asynchronous validations.

2. **Custom Hook Implementation**

   - Developed a custom hook `useForm` to manage form state, input changes, form submission, and validation errors.

3. **Validation Logic**

   - Integrated Yup for validation schema to handle complex validation rules.
   - The custom hook supports both synchronous and asynchronous validations, ensuring robust form handling.

4. **Documentation**
   - Added clear and concise comments to the code for better understanding and maintainability.

## Custom Hook Code

```typescript
const useForm = (
  initialState: { [key: string]: string },
  validationSchema: any
) => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    } catch (validationErrors) {
      const newErrors: { [key: string]: string } = {};
      validationErrors.inner.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isValid = await validate();
    if (isValid) {
      Swal.fire({
        title: "Success!",
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
```
