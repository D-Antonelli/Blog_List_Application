/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, 'Error: Min 3 caharacters'],
  },
  passwordHash: String,
  name: String,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // hide passwordHash
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model('User', userSchema);
