import * as bcrypt from "bcryptjs"

const authServiceFactory = () => {

  const validate = async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword);
  };
  const hashPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error("Error hashing password");
    }
  };

  return { validate, hashPassword };
};


module.exports = {
  authServiceFactory
};