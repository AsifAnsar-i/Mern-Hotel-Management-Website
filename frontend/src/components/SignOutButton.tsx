import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api.client";
import { useMutation, useQueryClient } from "react-query";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const mutation = useMutation(apiClient.logout, {
        onSuccess: async() => {
            await queryClient.invalidateQueries("validateToken");
            showToast({ message: "Logout successfully", type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });
    const handleClick = () => {
        mutation.mutate();
    };
  return <div>
    <button onClick={handleClick}>Sign Out</button>
  </div>;
};

export default SignOutButton;
