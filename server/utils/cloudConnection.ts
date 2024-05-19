import { v2 as cloudinary } from "cloudinary";
import { CLOUD_API_KEY, CLOUD_NAME, CLOUD_SECRET_KEY } from "../example.env";
import ErrorHandler from "./ErrorHandler";

const cloudConnect = async() => {
    try {
        await cloudinary.config({
            cloud_name: CLOUD_NAME,
            api_key: CLOUD_API_KEY,
            api_secret: "0RqKqZw05gMBv8CXEjCod19Ig0w",
          });  
        console.log('cloud connection successful!');      
    } catch (error:any) {
        new Error(error)
    }

}

export default cloudConnect