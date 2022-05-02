import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const petSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    shelter: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    image: { type: String, required: true },
    breed: { type: String, required: false },
    species: { type: String, required: false },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    color: { type: String, required: false },
    weight: { type: Number, required: false },
    activity_level: { type: String, required: false },
    grooming_requirement: { type: String, required: false },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  },
  {
    collation: { locale: 'en', strength: 2 }
  }
);
export default petSchema;
