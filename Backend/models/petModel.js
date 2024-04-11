import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You cannot leave this empty"],
        minLength: [3, "Name cannot be this short"],
        maxLength: [20, "Name cannot be this long"]
    },
    category: {
        type: String,
        required: [true, "You cannot leave this empty"],
        enum: ["Dog", "Cat", "Other"]
    },
    age: {
        type: Number,
        required: [true, "You cannot leave this empty"],
        minLength: [1, "age cannot be this short"],
        maxLength: [2, "age cannot be this long"]
    },
    gender: {
        type: String,
        required: [true, "you cannot leave this empty"],
        enum: ["Male", "Female"]
    },
    breed: {
        type: String,
        required: [true, "You cannot leave this empty"],
        minLength: [2, "breed name cannot be this short"],
        maxLength: [50, "breed name cannot be this long"]
    },
    description: {
        type: String,
        required: [true, "you cannot leave this empty"],
        minLength: [25, "description cannot be this short"],
        maxLength: [1000, "description cannot be this long"],
    },
    image: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    report: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    available: {
        type: Boolean,
        default: "true"
    }
});


export const Pet = mongoose.model("PetsData", petSchema);

