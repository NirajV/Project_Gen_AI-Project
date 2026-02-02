import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  title: { type: String },
  description: { type: String },
  status: { type: String }
}, {
  timestamps: true
});

const Note = mongoose.model('Note', noteSchema);

export default Note;