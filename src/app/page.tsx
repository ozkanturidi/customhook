"use client";
import { userSchema } from "@/Validation/userschema";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import useForm from "../CustomHooks/useForm";

export default function Home() {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const { formState, errors, isSubmitting, handleChange, handleSubmit } =
    useForm(initialState, userSchema);

  const renderTextField = ({ id, label, name, type, value }: any) => {
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
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center min-h-screen"
    >
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
        {/* <FormControl>
          <TextField
            id="name"
            type="text"
            label="Name"
            value={formState?.name}
            onChange={handleChange}
            fullWidth
            helperText={errors?.name}
            name="Name"
          />
        </FormControl> */}
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
  );
}
