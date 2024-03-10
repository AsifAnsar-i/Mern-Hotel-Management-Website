import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "ERROR" | "SUCCESS";
    onClose: () => void;
};

const Toast = ({ message, type,onClose }: ToastProps) => {
    useEffect(()=>{
         const timer = setTimeout(() => {
            onClose();
         }, 5000);

            return () => {
                clearTimeout(timer);
            }
    },[onClose])
  return (
    <div
      className={`${
        type === "ERROR" ? "bg-red-500" : "bg-green-500"
      } text-white p-2 rounded-md`}
    >
      {message}
    </div>
  );
};

export default Toast;