'use strict';
let bcrypt = require('bcryptjs')


module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Oh, you don\'t have a first name??'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Oh, you don\'t have a last name??'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please provide a valid email 🤨'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 32],
          msg: 'Password must be between 6 and 32 characters'
        }
      }
    },
    username: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    pic: DataTypes.STRING,
    street_number: DataTypes.STRING,
    route: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    country: DataTypes.STRING,
    }, {
    hooks: {
      beforeCreate: pendingUser => {
        //hash the password
        let hashedPassword = bcrypt.hashSync(pendingUser.password, 12)
        //reassign the hashed pw (overwrite plain pw)
        pendingUser.password = hashedPassword
      }
    }
  });
  user.associate = function (models) {
    // associations can be defined here
  };

  user.prototype.validPassword = function (typedInPassword) {
    //Determine if the password typed in hashes to the same thing as the existing hash (returns a boolean?)
    let correctPassword = bcrypt.compareSync(typedInPassword, this.password)

    //Return the (boolean) result of the comparison 
    return correctPassword
  }

  return user;
};