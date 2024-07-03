import { checkMail, checkName } from "@/app/DataFetch/fetchUsers";
import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .test("is-unique", "Name is already taken", async (value) => {
      return !(await checkName(value));
    }),
  email: yup
    .string()
    .email()
    .required()
    .test("is-unique", "Email is already in usage", async (value) => {
      return !(await checkMail(value));
    }),
  password: yup.string().min(6).required(),
});
