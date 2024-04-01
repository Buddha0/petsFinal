import cloudinary from 'cloudinary'
import { Pet } from "../models/petModel.js"
import { asyncErrorHandling } from "../middlewares/asyncErrorHandler.js"
import { createError, errorHanlder } from "../middlewares/errorHandling.js"
import { user } from "../models/userModel.js"


export const postPets = asyncErrorHandling(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Customer") {
        return res.status(403).json({ error: "You don't have access to this feature" });
    }

    const { name, category, age, description, breed, gender, available } = req.body;
    const createdBy = req.user.id;

    if (!name || !category || !age || !description || !breed || !gender) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }

    const { images } = req.files;
    if (!images || !Array.isArray(images)) {
        return res.status(400).json({ error: "Please provide two or more images" });
    }

    const allowedExtensions = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    for (const image of images) {
        if (!allowedExtensions.includes(image.mimetype)) {
            return res.status(400).json({ error: "Please upload images in PNG, JPEG, JPG, or WEBP format" });
        }
    }

    const uploadedImages = [];

    for (const image of images) {
        const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error");
            return res.status(500).json({ error: "Failed to upload image" });
        }
        uploadedImages.push({
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        });
    }

    const post = await Pet.create({
        name, age, category, description, breed, gender, createdBy, image: uploadedImages, available
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
    const { role } = req.user
    if (role == "Customer") return errorHanlder(createError("you don't have access to this feature"), req, res)

    const { id } = req.params;

    let petToDelete = await Pet.findById(id);
    if (!petToDelete) {
        return errorHanlder(createError("couldnt't find the pet"), req, res)
    }

    await Pet.deleteOne({ _id: id });

    res.status(200).json({
        success: true,
        message: "Pet deleted successfully"
    });
});

export const updatePet = asyncErrorHandling(async (req, res) => {
    const { role } = req.user;
    if (role === "Customer") return errorHanlder(createError("You don't have access to this feature"), req, res);

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


export const addToFav = asyncErrorHandling(async (req, res) => {
    const { role, id: userId } = req.user;
    if (role === "Admin") {
        return errorHanlder(createError("You don't have access to this feature"), req, res);
    }

    const { id } = req.params;
    if (!id) {
        return errorHanlder(createError("Pet not found"), req, res);
    }

    const result = await user.findOneAndUpdate(
        { _id: userId, 'favorites': { $ne: id } },
        { $push: { favorites: id } },
        { new: true }
    );

    if (!result) {
        return errorHanlder(createError("Pet already in favorites"), req, res);
    }

    res.send({
        success: true,
        message: "Pet added to favorites successfully!",
    });
});

export const veiwFavPet = asyncErrorHandling(async (req, res) => {
    const { role, id: userId } = req.user

    if (role == "Admin") return errorHanlder(createError("you don't have access to this feature"), req, res)

    const favUser = await user.findById(userId).populate('favorites')

    if (!favUser) return errorHanlder(createError("User not found"), req, res)

    const fav = favUser.favorites

    res.send({
        success: true,
        favorites: fav,
    });
})