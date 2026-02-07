// config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb+srv://pawanyadav12582:8809972062@cluster0.s7jzwi4.mongodb.net/food-del?retryWrites=true&w=majority";

  try {
   
    mongoose.set("strictQuery", false);

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    
    });

    console.log(" MongoDB Connected");
  } catch (err) {
    console.error(" DB Connection Failed:", err.message);
    throw err;
  }
};
