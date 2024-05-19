import express,{ Express,Request,Response,NextFunction } from "express";
import { CLOUD_API_KEY, CLOUD_NAME, CLOUD_SECRET_KEY, PORT } from "./example.env";
import connectDB from "./db/db";
import Errors from "./middleware/Errors";
import cookieParser from 'cookie-parser'
import defaultRoute from './route/app.route'
import morgan from 'morgan'
import cloudConnect from "./utils/cloudConnection";
import 'dotenv/config'
import fileUpload from 'express-fileupload'

//cloudinary configuration
cloudConnect()



const app : Express = express()
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())

// routing for API application
app.use('/api/v1',defaultRoute)





app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found!`) as any;
    err.statusCode = 400;
    next(err);
});

app.use(Errors)
app.listen(PORT,() => {
    console.log("server started successfully!")
    connectDB()
})

