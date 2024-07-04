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
      <section className="w-[500px]">
        <h3 className="text-5xl font-bold mb-9">Form criterias</h3>
        <ul className="list-disc list-inside text-xl flex flex-col gap-2">
          <li className="list-item">
            <span className="text-red-500 font-bold">Name:</span> required and
            unique{" "}
            <p>
              names already in usage:
              <span className="text-xl font-bold">
                &nbsp; Leanne Graham, Ervin Howell etc
              </span>
            </p>
          </li>
          <li className="list-item">
            <span className="text-red-500 font-bold">Email:</span> required,
            email format and unique
            <p>
              emails already in usage:
              <span className="text-xl font-bold">
                &nbsp; Sincere@april.biz, Shanna@melissa.tv
              </span>
            </p>
          </li>
          <li className="list-item">
            <span className="text-red-500 font-bold">Password:</span> required,
            min 6 characters passwords already in usage: &#128522;
          </li>
        </ul>
      </section>
    </div>
  );
}
