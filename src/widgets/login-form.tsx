import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

// TODO
// - Improve form validation
//

export type LoginInput = TypeOf<typeof loginSchema>;

export default function LoginForm() {
  const [loginMessage, setLoginMessage] = useState("");

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginInput>();

  const handleFormSubmit: SubmitHandler<LoginInput> = (values) => {
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: (user: LoginInput) => {
      return loginUser(user);
    },
    onSuccess: (res) => {
      const token = res.access_token;
      localStorage.setItem("token", token);
      navigate("/");
    },
    onError: (res) => {
      //   console.log({ response });
      setLoginMessage(`Error logging in: ${res.response.statusText}`);
    },
  });

  return (
    <>
      {loginMessage && <h2>{loginMessage}</h2>}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
        />
        <hr />
        <input type="submit" value="Log in" />
      </form>
    </>
  );
}
