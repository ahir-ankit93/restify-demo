const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authernicate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try{
            //Get user by email
            const user = await User.findOne({email});

            // Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    resolve(user);
                } else {
                    // Password does not match
                    reject('Authentication Failed');
                }
            });

        }catch(err){
            // Email not found
            reject('Authentication Failed');
        }
    });
}