import nodemailer from 'nodemailer';

import { createUserRepo, checkLoginRepo, getAllUsersRepo, sendOtpRepo, saveUserOtpRepo, getUserByOtpRepo, updateUserRepo } from '../repository/user.js';
import { EMAIL_USER, EMAIL_PASSWORD } from '../constants/Constants.js';

export const loginService = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  checkLoginRepo(email, password).then(user => {
    if ( user.length ) {
      const response = {
        hasError: false,
        data: user[0],
        errorCode: null
      };
      res.send(response);
    } else {
      const response = {
        hasError: true,
        data: null,
        error: {
          code: 100,
          message: "Invalid email and password"
        }
      }
      res.status(401).send(response);
    }
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
}

export const createUserService = (req, res) => {
  const user = req.body;
  createUserRepo(user).then(newUser => {
    const response = {
      hasError: false,
      data: newUser,
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


export const getAllUsersService = (req, res) => {

  getAllUsersRepo().then(events => {

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

export const sendOtpService = (req, res) => {
  const email = req.body.emailId;
  sendOtpRepo(email).then(user => {
	console.log(user)
	if ( user.length ) { 
		const otp = prepareOtp();
		const userId = user[0]._id;
		console.log(otp);
		saveUserOtpRepo(otp, userId).then(userOtp => {
			const response = {
			  hasError: false,
			  data: [],
			  errorCode: null
			};
			res.send(response);
			sendEmail(otp, user[0].firstName, user[0].email);
			
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


export const savePasswordService = (req, res) => {
  const otp = req.body.otp;
  const pass = req.body.password;
  getUserByOtpRepo(otp).then(otp => {
	console.log(otp)
	console.log('if block')
	const otpTime = otp.createdAt;
	const timeDiff = Math.round((new Date().getTime() - new Date(otpTime).getTime())/(1000*60));
	console.log(timeDiff)
	if(timeDiff <= 5) {
		updateUserRepo(otp.userId._id, pass).then(userOtp => {
			const response = {
			  hasError: false,
			  data: [],
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
			message: "OTP has Expired"
		  }
		}
		res.status(500).send(response);
	}
    
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






const prepareOtp = () => {
	let val = Math.floor(1000 + Math.random() * 9000);
	return val;
}

const sendEmail = (otp, userName, userEmail) => {
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
	  to: userEmail,
	  subject: 'Forgot Password OTP',
	  text: 'Hi '+ userName +', \n\n Use this OTP to seset your password \n\n' + otp
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
}