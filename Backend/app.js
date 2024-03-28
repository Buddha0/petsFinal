import Express from 'express';
import dotenv from 'dotenv'
import { connectDB } from "./database/database.js"
import petRoute from "./routes/petRoute.js"
import cors from 'cors'
import fileUpload from 'express-fileupload';
import userRoute from "./routes/userRoute.js"
import { errorHanlder } from './middlewares/errorHandling.js';
import cookieParser from 'cookie-parser';

const app = Express();

dotenv.config({ path: "./config/config.env" });

app.use(cors());

app.use(cookieParser())
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/"
}))


app.use("/petfinder", petRoute);
app.use('/petfinder', userRoute)

connectDB();

app.use(errorHanlder)

export default app;

