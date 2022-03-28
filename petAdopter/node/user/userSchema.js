import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isShelter: { type: Boolean, default: false, required: true },
    shelter: {
      name: String,
      logo: String,
      description: String,
      rating: { type: Number, default: 0, required: true },
      contactAddress: { 
        fullName: String,
        address: String,
        city: String,
        postalCode: String,
        country: String
         },
    },
  },
  {
    timestamps: true, // time for creating/updating a record
  }
);
export default userSchema;
