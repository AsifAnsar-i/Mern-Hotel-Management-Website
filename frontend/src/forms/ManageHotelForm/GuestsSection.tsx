import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="flex flex-col md:flex-row">
        <label className="">
          Adults
          <input
            type="number"
            min={0}
            className=" focus:outline-none"
            {...register("adultCount", { required: "This field is required" })}
          ></input>
          {errors.adultCount && <p>{errors.adultCount.message}</p>}
        </label>
        <label className="">
          Childrens
          <input
            type="number"
            min={0}
            className=" focus:outline-none"
            {...register("childCount", { required: "This field is required" })}
          ></input>
          {errors.childCount && <p>{errors.childCount.message}</p>}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
