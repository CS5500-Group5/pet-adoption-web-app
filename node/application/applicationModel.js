import mongoose from 'mongoose';
import applicationSchema from "./applicationSchema.js";

const Application = mongoose.model('Application', applicationSchema);
export default Application;
