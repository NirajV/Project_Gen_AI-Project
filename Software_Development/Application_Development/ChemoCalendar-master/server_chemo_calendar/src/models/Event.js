import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  eventName: { type: String },
  cancerName: { type: String, required: true },
  beginDate: { type: String, required: true },
  patientName: { type: String, required: false },
  mrn: { type: String },
  timeSlot: { type: String },
  cycles: [{
    cycleName: { type: String, required: true },
    beginFrom: { type: String, required: true },
    cycleStartDate: {type: String},
    cycleEndDate: { type: String },
    cycleColor: { type: String },
    medicines: [{
      name: { type: String, required: true },
      days: [{ type: String }],
      frequency: { type: String},
	  type: { type: String},
	  strength: { type: String},
	  duration: { type: String},
      medicineColor: String,
	  completeStatus : [{
		  medicineDate: {type: String},
		  status: {type: String},
		  completionDate: {type: String}
	  }
	  ]
    }],
    cycleLength: Number,
    repetition: Number
  }],
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventsSchema);

export default Event;