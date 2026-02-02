import formidable from 'formidable';
import nodemailer from 'nodemailer';

import { createEventRepo, getAllEventsRepo, getEventByIdRepo, updateEventRepo, getFilteredEventsRepo } from '../repository/event.js';
import { formatEvent, formatUpdateEvent } from '../utils/index.js';
import { EMAIL_USER, EMAIL_PASSWORD } from '../constants/Constants.js';

const validateEventRequest = (event) => {
  let isValid = false;
  console.log(event)
  if (event.eventName &&
      event.cancerName &&
      event.beginDate &&
      event.userId &&
      event.cycles &&
      event.cycles.length
    ) {
        isValid = true;
  }
  return isValid
}

const validateId = (id) => {
  let isValid = false;
  if(id && id.match(/^[0-9a-fA-F]{24}$/)) {
    isValid = true;
  }
  return isValid;
}

export const createEventService = (req, res) => {

  const event = req.body;
  if ( typeof event !== 'object' || !validateEventRequest(event)) {
    res.status(400).send({
      hasError: true,
      data: null,
      error: {
        code: 100,
        message: "Bad request"
      }
    })
  } else {
    const formatedEvent = formatEvent(event);
    createEventRepo(formatedEvent).then(newEvent => {
      const response = {
        hasError: false,
        data: newEvent,
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
      res.status(400).send(response);
    });
  }
};

export const getFilteredEventsService = (req, res) => {

  getFilteredEventsRepo(req.body).then(events => {

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

export const getAllEventsService = (req, res) => {

  const userId = req.body.userId;

  getAllEventsRepo(userId).then(events => {

    const response = {
      hasError: false,
      data: events,
      errorCode: null
    };

    res.send(response);
  }).catch(err => {
    console.log("hello", err);
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

export const getEventByIdService = (req, res) => {

  const hospitalId = req.body.hospitalId;
  const eventId = req.body.eventId;

  //if (validateId(hospitalId) && validateId(eventId)) {
    //getEventByIdRepo(eventId, hospitalId).then(event => {
  if (validateId(eventId)) {
    getEventByIdRepo(eventId).then(event => {      
      const response = {
        hasError: false,
        data: event,
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
  } else {
    const response = {
      hasError: true,
      data: null,
      error: {
        code: 100,
        message: "Invalid event id"
      }
    }
    res.status(400).send(response);
  }
}


export const updateEventService = (req, res) => {

  const event = req.body;
  if ( typeof event !== 'object' || !validateEventRequest(event)) {
    res.status(400).send({
      hasError: true,
      data: null,
      error: {
        code: 100,
        message: "Bad request"
      }
    })
  } else {
	const formatedEvent = formatUpdateEvent(event);
    updateEventRepo(formatedEvent).then(newEvent => {
      const response = {
        hasError: false,
        data: newEvent,
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
      res.status(400).send(response);
    });
  }
};

export const sendEventService = (req, res) => {
	
	var form = new formidable.IncomingForm();
	var file, email, patientName, eventName, beginDate, viewType;
	form.parse(req, function (err, fields, files) {
		email = fields.emailId;
		patientName = fields.patientName;
		eventName = fields.eventName;
		beginDate = fields.beginDate;
		viewType = fields.viewType;
		file = files.pdf;
		
		if(file && email) {
			sendEmail(file, email, patientName, eventName, beginDate, viewType);
			const response = {
			hasError: false,
			data: [],
			errorCode: null
		};

		res.send(response);
		} else {
			const response = {
				hasError: true,
				data: null,
				error: {
					code: 100,
					message: "File or EmailId is not available"
				}
			}
			res.status(500).send(response);
		}
    });
	
	

}

const sendEmail = (file, email, patientName, eventName, beginDate, viewType) => {
	console.log('email')
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASSWORD
	  }
	});

	var mailOptions = {
	  from: EMAIL_USER,
	  to: email,
	  subject: patientName+ ' : '+viewType+' VIEW',
	  text: 'Hello, \n Please find patient details. \n\n Patient Name - '+ patientName+'\n Event Name - '+ eventName + ' \n Start Date - '+ beginDate,
	  attachments: [{'filename': 'Attachment.pdf', 'content': file}]
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
}