import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cycleSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cycleName: { type: String, required: true },
  eventName: { type: String },
  medicines: [{
    name: { type: String, required: true },
    days: { type: String},
  }],
  cycleLength: Number,
  repetition: Number
  }, {
  timestamps: true
});

cycleSchema.index({cycleName: 1, eventName: 1}, {unique: true});

const Cycle = mongoose.model('Cycle', cycleSchema);

export default Cycle;