import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";
const TypeSection = () => {
    const {register,formState:{errors}} = useFormContext<HotelFormData>();
  return <div >
    <h2 className="text-2xl font-bold mb-3">Type</h2>
    <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
            <label key={type} className="flex items-center">
            <input
                type="radio"
                value={type}
                {...register("type",{required: "This field is required"})}
                className="mr-2"
            />
            {type}
            </label>
        ))}
    </div>
    {errors.type && <p>{errors.type.message}</p>}
  </div>;
};

export default TypeSection;
