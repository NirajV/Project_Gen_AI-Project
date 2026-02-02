import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userOtpSchema = new Schema({
  otp: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

const UserOtp = mongoose.model('UserOtp', userOtpSchema);

export default UserOtp;