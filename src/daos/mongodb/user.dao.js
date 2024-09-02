import { userModel } from '../mongodb/models/user.model.js';

export const userDao = {
  
  getAllUsers: async () => {
    try {
      return await userModel.find().exec();
    } catch (error) {
      throw new Error('Error al obtener los usuarios: ' + error.message);
    }
  },

  
  getUserById: async (id) => {
    try {
      return await userModel.findById(id).exec();
    } catch (error) {
      throw new Error('Error al obtener el usuario: ' + error.message);
    }
  },

  
  getUserByEmail: async (email) => {
    try {
      return await userModel.findOne({ email }).exec();
    } catch (error) {
      throw new Error('Error al obtener el usuario por email: ' + error.message);
    }
  },

  
  createUser: async (userData) => {
    try {
      const newUser = new userModel(userData);
      return await newUser.save();
    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error.message);
    }
  },

  
  updateUserById: async (id, updateData) => {
    try {
      return await userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    } catch (error) {
      throw new Error('Error al actualizar el usuario: ' + error.message);
    }
  },

  
  deleteUserById: async (id) => {
    try {
      return await userModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error('Error al eliminar el usuario: ' + error.message);
    }
  }
};
