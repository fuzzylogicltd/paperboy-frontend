import { useMutation } from "@tanstack/react-query";
import { addUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "radix-ui";
import { AxiosError } from "axios";

import TextField from "./forms/TextField";
import { ILoginInfo } from "../api/types";

export default function SignupForm() {
  const [signupMessage, setSignupMessage] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get("password") !== formData.get("confirmPassword")) {
      setSignupMessage("Passwords don't match");
      return;
    }

    const values = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: (user: ILoginInfo) => {
      return addUser(user);
    },
    onSuccess: () => {
      navigate("/signin");
    },
    onError: (res: AxiosError) => {
      setSignupMessage(
        `Error signing up: ${
          // res.response?.data?.message ?? res.response?.statusText
          // TODO: get TS to play nice here so we can have better messages
          res.response?.statusText
        }`
      );
    },
  });

  return (
    <>
      {signupMessage && <h2>{signupMessage}</h2>}
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

        <TextField
          fieldName="confirmPassword"
          labelText="Password Again"
          isRequired={true}
          fieldType="password"
        />

        <Form.Submit asChild>
          <button className="button" style={{ marginTop: 10 }}>
            Sign up
          </button>
        </Form.Submit>
      </Form.Root>
    </>
  );
}
