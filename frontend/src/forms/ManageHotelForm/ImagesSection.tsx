import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";


const ImagesSection = () => {
    const {
        register,
        formState: { errors },
      } = useFormContext<HotelFormData>();
  return <div>
    <h2 className="text-2xl font-bold mb-3">Images</h2>
    <div className="flex flex-col gap-4">
        <input type="file"
            multiple
            accept="image/*"
            className="w-full"
         {...register("imageFiles",{
            validate:(imageFiles)=>{
                const totalLength = imageFiles.length;
                if(totalLength===0){
                    return "At least one image should be added"
                }
                if(totalLength>6){
                    return "Maximum 6 images are allowed"
                }
                return true;
            }
         })}
        />
    </div>
    {errors.imageFiles && <p>{errors.imageFiles.message}</p>}
  </div>;
};

export default ImagesSection;
