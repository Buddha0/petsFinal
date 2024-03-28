import cloudinary from 'cloudinary'
import { Pet } from "../models/petModel.js"
import { asyncErrorHandling } from "../middlewares/asyncErrorHandler.js"
import { createError, errorHanlder } from "../middlewares/errorHandling.js"


export const getpets = asyncErrorHandling(async (req, res) => {
    const getallpets = await Pet.find()
    res.send({
        success: true,
        message: "got all pets",
        getallpets

    })
})

export const postPets = asyncErrorHandling(async (req, res, next) => {
    const { name, category, age, description, breed, gender } = req.body
    if (!name || !category || !age || !description || !breed || !gender) {
        return errorHanlder(createError("you cannot leave any of these empty"), req, res)
    }
    const { image } = req.files;

    if (!req.files || !req.files.image) {
        return errorHanlder(createError("Please upload the image"), req, res);
    }

    const allowedExtension = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (!allowedExtension.includes(image.mimetype)) {
        return errorHanlder(createError("Please upload the image in PNG, JPEG, JPG, or WEBP format"), req, res);
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error");
        return errorHanlder(createError("Failed to upload"), req, res);
    }

    const post = await Pet.create({
        name, age, category, description, breed, gender, image: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    })
    res.send({
        success: true,
        message: "posted about pets",
        post
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

export const deletePet = asyncErrorHandling(async (req, res) => {
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
    const { id } = req.params;

    let petToUpdate = await Pet.findById(id);
    if (!petToUpdate) {
        return errorHanlder(createError("Could not find the pet"), req, res);
    }

    if (req.files && req.files.image) {
        const { image } = req.files;

        const allowedExtensions = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
        if (!allowedExtensions.includes(image.mimetype)) {
            return errorHanlder(createError("Please upload the image in PNG, JPEG, JPG, or WEBP format"), req, res);
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error");
            return errorHanlder(createError("Failed to upload"), req, res);
        }

        const updatedPet = await Pet.findByIdAndUpdate(id, {
            ...req.body, image: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
        }, {
            returnOriginal: false,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).send({
            success: true,
            message: "Pet data updated successfully with new image",
            updatedPet
        });
    } else {
        const updatedPet = await Pet.findByIdAndUpdate(id, req.body, {
            returnOriginal: false,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).send({
            success: true,
            message: "Pet data updated successfully without changing the image",
            updatedPet
        });
    }
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