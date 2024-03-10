import { useForm } from "react-hook-form";
import * as apiClient from "../api.client";
import { useMutation, useQueryClient } from 'react-query';
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async() => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Register successfully", type: "SUCCESS" });
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
    <form onSubmit={onSubmit} className="flex flex-col ">
      <h2>Create an Account</h2>
      <div className="flex flex-col md:flex-row">
        <label className="">
          First Name
          <input
            className=""
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </label>
        <label className="">
          Last Name
          <input
            className=""
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </label>
      </div>
      <label className="">
        Email
        <input
          className=""
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && <p>{errors.email.message}</p>}
      </label>
      <label className="">
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
      <label className="">
        Confirm Password
        <input
          className=""
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your password do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </label>
      <span>
        Already Registered?<Link to="/login" className="underline">Login here</Link>
      </span>
      <span>
        <button type="submit">Create Account</button>
      </span>
    </form>
  );
};

export default Register;
