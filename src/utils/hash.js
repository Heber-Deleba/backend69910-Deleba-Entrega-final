import bcrypt from "bcrypt";

// hash de la contraseña
export async function createHash(password) {
  const salt = await bcrypt.genSalt(10); 
  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
}

// comparar una contraseña con su hash
export async function comparePassword(password, hashPassword) {
  const isPasswordCorrect = await bcrypt.compare(password, hashPassword);

  return isPasswordCorrect;
}
