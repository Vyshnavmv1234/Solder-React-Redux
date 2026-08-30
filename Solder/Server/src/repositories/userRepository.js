import User from '../models/User.js'

const findByEmail = async (email) => {
  return User.findOne({ email }).select("+password");
};

const createUser = async (userData) =>{
  return User.create(userData)
}

export default {findByEmail,createUser}