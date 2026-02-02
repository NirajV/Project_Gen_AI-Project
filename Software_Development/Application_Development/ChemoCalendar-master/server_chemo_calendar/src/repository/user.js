import User from '../models/User.js';
import UserOtp from '../models/UserOtp.js';

export const createUserRepo = (user) => {
  return new Promise ((resolve, reject) => {
    const newUser = new User(user);
    newUser.save((err) => {
      if (err) reject(err);
      else resolve(newUser);
    });
  });
};

export const checkLoginRepo = (email, password) => {
  return new Promise ((resolve, reject) => {
    User.find({email, password}, (err, user) => {
      if (err) reject(err);
      else resolve(user);
    });
  });
}

export const getAllUsersRepo = () => {
  return new Promise ((resolve, reject) => {
    User.find({}, null, { sort:{ firstName: 'ascending' } }, (err, users) => {
      if (err) reject(err);
      else resolve(users);
    })
  })
}

export const sendOtpRepo = (email) => {
  return new Promise ((resolve, reject) => {
    User.find({email}, (err, user) => {
      if (err) reject(err);
      else resolve(user);
    })
  })
}

export const saveUserOtpRepo = (otp, userId) => {
  const otpObject = {otp: otp, userId: userId};
  console.log(otpObject)
  return new Promise ((resolve, reject) => {
    const userOtp = new UserOtp(otpObject);
	console.log(userOtp)
    userOtp.save((err) => {
      if (err) reject(err);
      else resolve(userOtp);
    });
  });
};

export const getUserByOtpRepo = (otp) => {
  return new Promise ((resolve, reject) => {
		UserOtp.findOne({ otp }).populate('userId').exec(function(err, items) {
			if (err) reject(err);
			  else resolve(items);
		});
  })
}

export const updateUserRepo = (id, pass) => {
  return new Promise ((resolve, reject) => {
	User.update({'_id':id}, 
    { $set: {'password': pass} }, (err) => {
		
      if (err) reject(err);
      else resolve(id);
    })
  });
};