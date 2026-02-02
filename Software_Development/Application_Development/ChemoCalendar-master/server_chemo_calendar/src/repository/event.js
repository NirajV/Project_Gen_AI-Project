import Event from '../models/Event.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export const createEventRepo = (event) => {
  return new Promise ((resolve, reject) => {
    const newEvent = new Event(event);
    newEvent.save((err) => {
      if (err) reject(err);
      else resolve(newEvent);
    });
  });
};

export const getAllEventsRepo = (hospitalId) => {
  return new Promise ((resolve, reject) => {
    User.find({ hospitalId: hospitalId }, (er, users) => {
      const userIds = users.map(user => user._id);
      Event.find({
        'userId': {
          $in: userIds
        }
      }, null, { sort:{ beginDate: 'descending' } }, (err, events) => {
        if (err) reject(err);
        else resolve(events);
      })
    });
  })
}

export const getFilteredEventsRepo = (payload) => {
  return new Promise ((resolve, reject) => {
    User.find({ hospitalId: payload.hospitalId }, (er, users) => {
      const { eventName, patientName, cancerName, mrn, hospitalId  } = payload;
      const userIds = users.map(user => user._id);
      const query = {
        'userId': {
          $in: userIds
        }
      }
      if(eventName && eventName.length) query['eventName'] = new RegExp([eventName.toLowerCase()].join(""), "i");
      if(patientName && patientName.length) query['patientName'] = new RegExp([patientName.toLowerCase()].join(""), "i");
      if(cancerName && cancerName.length) query['cancerName'] = new RegExp([cancerName.toLowerCase()].join(""), "i");
      if(mrn && mrn.length) query['mrn'] = new RegExp([mrn.toLowerCase()].join(""), "i");
      Event.find(query, null, { sort:{ beginDate: -1 } }, (err, events) => {
        if (err) reject(err);
        else resolve(events);
      })
    });
  })
}

export const getEventByIdRepo = (eventId, userId) => {
  return new Promise ((resolve, reject) => {
    Event.find({ _id: eventId }, (err, events) => {
      if (err) reject(err);
      else resolve(events[0]);
    })
  })
}

export const updateEventRepo = (event) => {
  return new Promise ((resolve, reject) => {
    const newEvent = new Event(event);
    Event.update({ _id: event._id, userId: event.userId }, event, (err, event) => {
      if (err) reject(err);
      else resolve(newEvent);
    })
  });
};
