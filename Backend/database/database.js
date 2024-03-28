import mongoose from 'mongoose';

export const connectDB = () => {
    const db_url = process.env.MONGO_DB_URI;

    mongoose.connect(db_url)
        .then(() => {
            console.log("Connection successful");
        })
        .catch((err) => {
            console.error("Connection error:", err);
        });
};
