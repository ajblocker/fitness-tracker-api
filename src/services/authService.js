import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../repositories/userRepo.js';

//sign up function to create a new user and hash their password
export async function signUp(name, email, passwordHash) {
  //hash the password
  const hashedPassword = await bcrypt.hash(passwordHash, 10);
  //call the repo layer to create the user in the database
  const newUser = await createUser({
    name,
    email,
    passwordHash: hashedPassword,
  });
  return newUser;
}

//log in function to authenticate a user by their email and password
export async function logIn(email, passwordHash) {
  //create an error object to throw if authentication fails
  const error = new Error('Invalid credentials');
  error.status = 401;
  //find the user by their email
  const user = await findUserByEmail(email);
  //if the user doesn't exist or the password doesn't match, throw an error
  if (!user) throw error;
  //store the result of comparing the provided password with the stored password hash
  const match = await bcrypt.compare(passwordHash, user.passwordHash);
  //if the passwords don't match, throw an error
  if (!match) throw error;

  //if authentication is successful, generate a JWT access token with the user's ID as the payload and a 1 hour expiration time
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );
  return accessToken;
}
