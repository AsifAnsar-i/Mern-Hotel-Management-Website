import express,{Request,Response} from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel, { HotelType } from '../models/hotel';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';
const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024
    }
});

router.post("/",verifyToken,[
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and should be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required and should be an array"),
],upload.array("imageFiles",6),async(req:Request,res:Response)=>{
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotels:HotelType =req.body;
        
        const uploadPromises = imageFiles.map(async(image)=>{
             const b64 = Buffer.from(image.buffer).toString("base64");
             const dataURI = "data:" + image.mimetype + ";base64," + b64;
             const res =await cloudinary.v2.uploader.upload(dataURI);
             return res.url;
        })

        const imageUrls = await Promise.all(uploadPromises);
        newHotels.imageUrls = imageUrls;
        newHotels.lastUpdated = new Date();
        newHotels.userId = req.userId;
        const hotel = new Hotel(newHotels);
        await hotel.save();
        res.status(201).json(hotel);

    } catch (error) {
        
        console.log("Error creating hotels: ",error);
        res.status(500).json({message:"Something went wrong."});
    }
        
})


router.get("/",verifyToken,async(req:Request,res:Response)=>{
    try {
        const hotels = await Hotel.find({userId:req.userId});
        res.json(hotels);
    } catch (error) {
        console.log("Error fetching hotels: ",error);
        res.status(500).json({message:"Error fetching hotels"});
    }
})


router.get("/:id",verifyToken,async(req:Request,res:Response)=>{
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne(
            {
                _id:id,
                userId:req.userId
            }
        );
        if(!hotel){
            return res.status(404).json({message:"Hotel not found"});
        }
        res.json(hotel);
    } catch (error) {
        console.log("Error fetching hotel: ",error);
        res.status(500).json({message:"Error fetching hotel"});
    }
})



export default router;