import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  role: String,
  hospitalId: { type: Schema.Types.ObjectId, ref: 'Hospital' }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;