import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-3">Add Hotel</h1>
      <label>
        Name
        <input
          type="text"
          className=""
          {...register("name", { required: "This field is required" })}
        ></input>
        {errors.name && <p>{errors.name.message}</p>}
      </label>
      <div className="flex flex-col md:flex-row">
        <label className="">
          City
          <input
            type="text"
            className=""
            {...register("city", { required: "This field is required" })}
          ></input>
          {errors.city && <p>{errors.city.message}</p>}
        </label>
        <label className="">
          Country
          <input
            type="text"
            className=""
            {...register("country", { required: "This field is required" })}
          ></input>
          {errors.country && <p>{errors.country.message}</p>}
        </label>
      </div>
      <label>
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && <p>{errors.description.message}</p>}
      </label>
      <label className="">
        Price per night
        <input
          type="number"
          min={1}
          className=" focus:outline-none"
          {...register("pricePerNight", { required: "This field is required" })}
        ></input>
        {errors.pricePerNight && <p>{errors.pricePerNight.message}</p>}
      </label>
      <label className="">
        Rating
        <select
          className=" "
          {...register("starRating", { required: "This field is required" })}
        >
            <option>
                Select as Rating
            </option>
            {
                [1,2,3,4,5].map((rating,i) => (
                    <option key={i} value={rating}>{rating}</option>
                ))
            
            }
        </select>
        {errors.starRating && <p>{errors.starRating.message}</p>}
      </label>
    </div>
  );
};

export default DetailsSection;
