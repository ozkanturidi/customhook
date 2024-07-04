import { checkMail, checkName } from "@/app/DataFetch/fetchUsers";
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
    .required("Password is required"),
});
