// server/models/user.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  }
});

// Register the model with Mongoose
const User = mongoose.model('User', userSchema);

export default User;
