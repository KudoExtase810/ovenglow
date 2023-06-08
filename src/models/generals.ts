import mongoose from "mongoose";
const GeneralsSchema = new mongoose.Schema({
    email: { type: String },
    location: {
        longitude: { type: Number },
        latitude: { type: Number },
        name: { type: String },
    },
    storePhone: { type: String },
    categories: { type: [String] },
});
const Generals =
    mongoose.models.Generals || mongoose.model("Generals", GeneralsSchema);
export default Generals;
