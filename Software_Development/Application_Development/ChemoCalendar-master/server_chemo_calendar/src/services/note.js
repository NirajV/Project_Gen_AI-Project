import { createNoteRepo, getAllNotesRepo, removeNoteRepo, updateNoteRepo } from '../repository/note.js';

export const createNoteService = (req, res) => {
  const note = req.body;
  createNoteRepo(note).then(newNote => {
    const response = {
      hasError: false,
      data: newNote,
      errorCode: null
    };
    res.send(response);
  }).catch(err => {
    const response = {
      hasError: true,
      data: null,
      error: {
        code: 100,
        message: err
      }
    }
    res.send(response);
  });
};

export const updateNoteService = (req, res) => {
  const note = req.body;
  updateNoteRepo(note).then(newNote => {
    const response = {
      hasError: false,
      data: newNote,
      errorCode: null
    };
    res.send(response);
  }).catch(err => {
	  console.log(err)
    const response = {
      hasError: true,
      data: null,
      error: {
        code: 100,
        message: err
      }
    }
    res.send(response);
  });
};


export const getAllNotesService = (req, res) => {
  const eventId = req.body.eventId;
  getAllNotesRepo(eventId).then(events => {
    const response = {
      hasError: false,
      data: events,
      errorCode: null
    };
	console.log(events)
    res.send(response);
  }).catch(err => {
    
    const response = {
      hasError: true,
      data: null,
      error: {
        code: 100,
        message: err
      }
    }
    res.status(500).send(response);
  });
}

export const removeNoteService = (req, res) => {
  const noteId = req.body.noteId;
  console.log(noteId)
  removeNoteRepo(noteId).then(events => {
    const response = {
      hasError: false,
      data: events,
      errorCode: null
    };

    res.send(response);
  }).catch(err => {
    
    const response = {
      hasError: true,
      data: null,
      error: {
        code: 100,
        message: err
      }
    }
    res.status(500).send(response);
  });
}