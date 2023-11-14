import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    content: {
      type: String
    },
    imageSrc: {
      type: String,
      required: [true, 'Please add an imageSrc value']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Post', postSchema);
