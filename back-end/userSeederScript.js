
require('dotenv').config();

const users = require('./api/data/users.data');
const UserModel = require('./api/model/User.model');
const connectDB = require('./api/config/dbConnection');

connectDB();

const importData = async() => {
  try {
    await UserModel.deleteMany({});
    await UserModel.insertMany(users);
    console.log('User import Successfully.');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

importData();