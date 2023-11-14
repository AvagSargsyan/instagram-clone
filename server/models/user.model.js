import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    fullName: {
      type: String
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password']
    },
    profilePictureSrc: {
      type: String,
      default: '/uploads/images/default_profile_picture.png'
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
