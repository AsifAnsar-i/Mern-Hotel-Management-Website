import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api.client";
const AddHotel = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      navigate("/");
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });
  const handleSave =(HotelFormData:FormData)=>{
    mutate(HotelFormData);
  }
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>;
};

export default AddHotel;
