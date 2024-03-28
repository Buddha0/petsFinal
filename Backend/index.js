import app from "./app.js"
import cloudinary from 'cloudinary'


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDIARY_PASS
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});


