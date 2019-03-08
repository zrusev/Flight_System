const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const secret = require('secret');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true
  },
  hashedPassword: {
    type: Schema.Types.String,
    required: true
  },
  full_name: {
    type: Schema.Types.String,
    required: true
  },
  salt: {
    type: Schema.Types.String,
    required: true
  },
  roles: [{
    type: Schema.Types.String,
    enum: ['User', 'Admin'],
    required: true
  }],
  flights: [
    { type: Schema.Types.ObjectId, 
      ref: 'Flight' }
  ],
  tickets: [
    { type: Schema.Types.ObjectId, 
      ref: 'Ticket' }
  ]
});

userSchema.method({
  authenticate: function (password) {
    const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

    return currentHashedPass === this.hashedPassword;
  }
})

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
  try {
    let users = await User.find();
    if (users.length > 0) return;
    const salt = encryption.generateSalt();
    const hashedPassword = encryption.generateHashedPassword(salt, secret.get('admin_password'));
    return User.create({
      full_name: secret.get('admin_name'),
      email: secret.get('admin_email'),
      salt,
      hashedPassword,
      roles: ['Admin']
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = User;