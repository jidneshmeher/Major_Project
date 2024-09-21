import bcrypt from "bcrypt"

export const hashedPassword = async(password) => {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      console.log(`Error while hashing: ${error}`);
    }
}

export const verifyPassword = async(password,hashPassword) => {
  try{
    return await bcrypt.compare(password,hashPassword)
  }catch(error){
    console.log(`Error while comparing: ${error}`);
    return false
  } 
}