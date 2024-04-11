import cloudinary from 'cloudinary'
import { Pet } from "../models/petModel.js"
import { asyncErrorHandling } from "../middlewares/asyncErrorHandler.js"
import { createError, errorHanlder } from "../middlewares/errorHandling.js"
import { user } from "../models/userModel.js"
import { Favorite } from "../models/favModel.js"

export const postPets = asyncErrorHandling(async (req, res, next) => {

    const { email } = req.user;

    if (!email.endsWith(".admin@gmail.com")) {
        return errorHanlder(createError("you don't have access to this feature"), req, res)
    }

    const { name, category, age, description, breed, gender, available } = req.body;
    const createdBy = req.user.id;

    if (!name || !category || !age || !description || !breed || !gender) {
        return errorHanlder(createError("Please provide all rewuired fields"), req, res)
    }


    const { images, report } = req.files;


    if (!images || !Array.isArray(images) || !req.files || !req.files.report) {
        return errorHanlder(createError("please provide two or more images"), req, res)
    }

    const allowedExtensions = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    for (const image of images) {
        if (!allowedExtensions.includes(image.mimetype)) {
            return errorHanlder(createError("Please upload images in PNG, JPEG, JPG, or WEBP format"), req, res)
        }
    }

    const uploadedImages = [];

    for (const image of images) {
        const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error");
            return errorHanlder(createError("Failed to upload image"), req, res)
        }
        uploadedImages.push({
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        });
    }

    if (!allowedExtensions.includes(report.mimetype)) {
        return errorHanlder(createError("Please upload the image in PNG, JPEG, JPG, or WEBP format"), req, res);
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(report.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error");
        return errorHanlder(createError("Failed to upload"), req, res);
    }



    const post = await Pet.create({
        name, age, category, description, breed, gender, createdBy, image: uploadedImages, report: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }, available
    });

    res.status(200).json({
        success: true,
        message: "Posted about pets",
        post
    });
})

export const getpets = asyncErrorHandling(async (req, res) => {
    const getallpets = await Pet.find({ available: true })
    res.send({
        success: true,
        message: "got all pets",
        getallpets

    })
})

export const getDogs = asyncErrorHandling(async (req, res) => {
    const { category } = req.query
    if (category != "Dog") {
        return errorHanlder(createError("Invalid category. Only Dog category is allowed."), req, res)
    }
    const dog = await Pet.find({ category: "Dog" })
    res.send({
        success: true,
        message: "dogs found",
        dog
    })
})

export const getCat = asyncErrorHandling(async (req, res) => {
    const { category } = req.query
    if (category !== "Cat") {
        return errorHanlder(createError("Invalid category. Only Cat category is allowed."), req, res)
    }

    const cat = await Pet.find({ category: "Cat" })
    res.send({
        success: true,
        message: "Cats found",
        cat
    })
})
export const getOther = asyncErrorHandling(async (req, res) => {
    const { category } = req.query;
    if (category !== "Other") {
        return errorHanlder(createError("Invalid category. Only 'Other' category is allowed."), req, res);
    }

    const others = await Pet.find({ category: "Other" });
    res.send({
        success: true,
        message: "Pets found with category 'Other'",
        others
    });
});

export const showPets = asyncErrorHandling(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return next(new Error("Couldn't find the pet"));
    }

    const getPetData = await Pet.findById(id);
    if (!getPetData) {
        return next(new Error('Pet not found'));
    }

    res.send({
        success: true,
        getPetData
    });
});

export const deletePet = asyncErrorHandling(async (req, res) => {
    const { email } = req.user
    if (!email.endsWith(".admin@gmail.com")) return errorHanlder(createError("you don't have access to this feature"), req, res)

    const { id } = req.params;

    let petToDelete = await Pet.findById(id);
    if (!petToDelete) {
        return errorHanlder(createError("couldnt't find the pet"), req, res)
    }

    await Pet.deleteOne({ _id: id });

    await Favorite.deleteMany({ pet: id });

    res.status(200).json({
        success: true,
        message: "Pet deleted successfully"
    });
});

export const updatePet = asyncErrorHandling(async (req, res) => {
    const { email } = req.user;
    if (!email.endsWith(".admin@gmail.com")) return errorHanlder(createError("You don't have access to this feature"), req, res);

    const { id } = req.params;

    let petToUpdate = await Pet.findById(id);
    if (!petToUpdate) {
        return errorHanlder(createError("Could not find the pet"), req, res);
    }

    if (req.files && req.files.images && req.files.images.length > 0) {
        const { images } = req.files;
        const allowedExtensions = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

        for (const image of images) {
            if (!allowedExtensions.includes(image.mimetype)) {
                return errorHanlder(createError("Please upload images in PNG, JPEG, JPG, or WEBP format"), req, res);
            }
        }

        const uploadedImages = [];

        for (const image of images) {
            const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
            if (!cloudinaryResponse || cloudinaryResponse.error) {
                console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error");
                return errorHanlder(createError("Failed to upload images"), req, res);
            }
            uploadedImages.push({
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            });
        }
        petToUpdate.image = uploadedImages;
    }

    Object.assign(petToUpdate, req.body);

    const updatedPet = await petToUpdate.save();

    res.status(200).send({
        success: true,
        message: "Pet data updated successfully",
        updatedPet
    });
});

export const addFav = asyncErrorHandling(async (req, res) => {
    const { id: userId, email } = req.user

    if (email.endsWith(".admin@gmail.com")) return errorHanlder(createError("You're not authorizeddd"), req, res)

    if (!userId) return errorHanlder(createError("not user found"), req, res)

    const { id: petId } = req.params;

    if (!petId) return errorHanlder(createError("No pet found"), req, res);

    const existingFavorite = await Favorite.findOne({ user: userId, pet: petId });

    if (existingFavorite) {
        await Favorite.deleteOne(existingFavorite);
        return res.status(400).json({ success: false, message: 'Pet removed from favourites' });
    }

    const favorite = new Favorite({ user: userId, pet: petId });
    await favorite.save();

    return res.status(200).json({ success: true, message: 'Pet added to favorites successfully' });

})

export const getFav = asyncErrorHandling(async (req, res) => {
    const { id: userId, email } = req.user

    if (email.endsWith(".admin@gmail.com")) return errorHanlder(createError("you are not authorized"), req, res)

    if (!userId) return errorHanlder(createError("no user found"), req, res)

    const users = await user.findById(userId);
    if (!users) {
        return errorHanlder(createError("User not found"), req, res);
    }
    const favorites = await Favorite.find({ user: userId }).populate('pet');

    return res.status(200).json({ success: true, favorites });
})
