import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'PetsData' },
});

export const Favorite = mongoose.model('Favorite', favoriteSchema);


