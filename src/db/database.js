import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://heberdeleba:RIGroMELYqL4hKNa@cluster0.oqibtwy.mongodb.net/coder69900';

export const initMongoDB = async() => {
  try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
}