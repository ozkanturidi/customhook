"use client";
import { userSchema } from "@/Validation/userschema";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import useForm from "../CustomHooks/useForm";

/**
 * Home Component - A registration form component
 */
export default function Home() {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  // Custom hook for form handling
  const { formState, errors, isSubmitting, handleChange, handleSubmit } =
    useForm(initialState, userSchema);

  /**
   * Render TextField Component
   * @param {Object} params - Parameters for TextField
   * @returns {JSX.Element} - TextField Component
   */
  const renderTextField = ({
    id,
    label,
    name,
    type,
    value,
  }: {
    id: string;
    label: string;
    name: string;
    type: string;
    value: string;
  }) => {
    return (
      <FormControl>
        <TextField
          id={id}
          fullWidth
          label={label}
          error={!!errors[name]}
          name={id}
          type={type}
          value={value}
          onChange={handleChange}
          helperText={errors[name]}
        />
      </FormControl>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen gap-8">
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "24px",
            borderRadius: "8px",
            bgcolor: "#f5f5f5",
            width: "400px",
          }}
        >
          <Typography variant="h4" align="center">
            Register Form
          </Typography>

          {renderTextField({
            id: "name",
            label: "Name",
            name: "name",
            type: "text",
            value: formState?.name,
          })}

          {renderTextField({
            id: "email",
            label: "Email",
            name: "email",
            type: "email",
            value: formState?.email,
          })}

          {renderTextField({
            id: "password",
            label: "Password",
            name: "password",
            type: "password",
            value: formState?.password,
          })}
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
      <section>
        <h3 className="text-4xl font-bold mb-9">Form criterias</h3>
        <ul className="list-disc list-inside text-xl">
          <li className="list-item">Name: required and unique</li>
          <li className="list-item">
            email: required, email format and unique
          </li>
          <li className="list-item">password: required, min 6 characters</li>
        </ul>
      </section>
    </div>
  );
}
