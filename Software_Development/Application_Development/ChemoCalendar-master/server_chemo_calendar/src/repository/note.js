import Note from '../models/Note.js';

export const createNoteRepo = (note) => {
  return new Promise ((resolve, reject) => {
    const newNote = new Note(note);
    newNote.save((err) => {
      if (err) reject(err);
      else resolve(newNote);
    });
  });
};

export const getAllNotesRepo = (eventId) => {
  return new Promise ((resolve, reject) => {
		Note.find({ eventId }, null, { sort:{ createdAt: -1 } }).populate('userId').exec(function(err, items) {
			if (err) reject(err);
			  else resolve(items);
		});
  })
}

export const removeNoteRepo = (noteId) => {
  return new Promise ((resolve, reject) => {
    Note.deleteOne({_id: noteId}, (err, notes) => {
      if (err) reject(err);
      else resolve(notes);
    })
  });
};

export const updateNoteRepo = (note) => {
  return new Promise ((resolve, reject) => {
	const newNote = new Note(note);
	Note.update({'_id':note.noteId}, 
    { $set: {'title': note.title, 'description': note.description} }, (err) => {
		
      if (err) console.log(err)//reject(err);
      else resolve(newNote);
    })
  });
};