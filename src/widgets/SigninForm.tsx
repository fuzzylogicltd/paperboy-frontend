import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "radix-ui";
import { AxiosError } from "axios";

import TextField from "./forms/TextField";
import { ILoginInfo } from "../api/types";

export default function LoginForm() {
  const [loginMessage, setLoginMessage] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: (user: ILoginInfo) => {
      return loginUser(user);
    },
    onSuccess: (res) => {
      const token = res.access_token;
      localStorage.setItem("token", token);
      navigate("/");
    },
    onError: (res: AxiosError) => {
      setLoginMessage(
        `Error logging in: ${
          // res.response?.data?.message ?? res.response?.statusText
          // TODO: get TS to play nice here so we can have better messages
          res.response?.statusText
        }`
      );
    },
  });

  return (
    <>
      {loginMessage && <h2>{loginMessage}</h2>}
      <Form.Root onSubmit={handleFormSubmit}>
        <TextField
          fieldName="email"
          labelText="Email"
          isRequired={true}
          fieldType="email"
        />

        <TextField
          fieldName="password"
          labelText="Password"
          isRequired={true}
          fieldType="password"
        />

        <Form.Submit asChild>
          <button className="button" style={{ marginTop: 10 }}>
            Sign in
          </button>
        </Form.Submit>
      </Form.Root>
    </>
  );
}
