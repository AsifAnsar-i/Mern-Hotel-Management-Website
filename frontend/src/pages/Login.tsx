import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api.client";
export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const mutation = useMutation(apiClient.login, {
    onSuccess: () => {
      console.log("user login successfully");
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <div>
      <h2>Login your Account</h2>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <label>
          Email
          <input
            className=""
            {...register("email", { required: "This field is required" })}
          ></input>
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        <label>
          Password
          <input
            className=""
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 character",
              },
            })}
          ></input>
            {errors.password && <p>{errors.password.message}</p>}
        </label>

        <button type="submit" className="">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
