import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true }
}, {
  timestamps: true
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

export default Hospital;