import { checkMail, checkName } from "@/utils/fetchUsers";
import * as yup from "yup";

/**
 * userSchema - Validation schema for user form
 */
export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .test("is-unique", "Name is already taken", async (value) => {
      return !(await checkName(value));
    }),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .test("is-unique", "Email is already in use", async (value) => {
      return !(await checkMail(value));
    }),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must be at most 15 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
});
