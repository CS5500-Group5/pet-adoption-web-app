import mongoose from 'mongoose';

const applicationSchema = mongoose.Schema(
  {
    petItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        pet: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'pet',
          required: true,
        },
      },
    ],
    applicantAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      lat: Number,
      lng: Number,
    },
   
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shelter: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    isApproved: { type: Boolean, default: false },
    approvedAt: { type: Date },
    
  },
  {
    timestamps: true,
  }
);
export default applicationSchema;
