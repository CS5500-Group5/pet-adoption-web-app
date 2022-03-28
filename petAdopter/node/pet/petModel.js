import mongoose from 'mongoose';
import petSchema from "./petSchema.js";

const pet = mongoose.model('pet', petSchema);

export default pet;
