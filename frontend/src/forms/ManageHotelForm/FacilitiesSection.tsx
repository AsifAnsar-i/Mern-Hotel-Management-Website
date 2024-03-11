import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
    const {register,formState:{errors}} = useFormContext<HotelFormData>();
  return <div>
    <h2 className="text-2xl font-bold mb-3">Facilities</h2>
    <div className="grid grid-cols-5 gap-2">
        {hotelFacilities.map((facility) => (
            <label key={facility} className="flex items-center">
            <input
                type="checkbox"
                value={facility}
                {...register("facilities",{
                    validate:(facilities)=>{
                          if(facilities && facilities.length>0){
                            return true;
                          }else{
                            return "At least one facility is required"
                          }
                    }
                })}
                className="mr-2"
            />
            {facility}
            </label>
        ))} 
    </div>
    {errors.facilities && <p>{errors.facilities.message}</p> }
    </div>;
}

export default FacilitiesSection;
