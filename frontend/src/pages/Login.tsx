import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api.client";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const mutation = useMutation(apiClient.login, {
    onSuccess: async() => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Login successfully", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <div>
      <h2>Sign In</h2>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <label>
          Email
          <input
           type="email"
            className=""
            {...register("email", { required: "This field is required" })}
          ></input>
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        <label>
          Password
          <input
            type="password"
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
       <span>
          Not Registered?<Link to="/register" className="underline">Create an account here</Link>
       </span>
        <button type="submit" >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
