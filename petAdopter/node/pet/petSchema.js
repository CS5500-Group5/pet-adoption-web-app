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
    breed: { type: String, required: true },
    species: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: false },
    countInStock: { type: Number, required: false },
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
