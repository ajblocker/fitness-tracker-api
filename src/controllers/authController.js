import { signUp, logIn } from '../services/authService.js';

//controller for handling user authentication logic, sign-up functionality
export async function signUpHandler(req, res) {
  //extract user details from request body
  const { name, email, password } = req.body;
  //call service function to create new user and return the created user object
  const newUser = await signUp(name, email, password);
  //respond with the created user object and a 201 Created status code
  res.status(201).json(newUser);
}

//controller function to handle log in requests
export async function logInHandler(req, res) {
  //extract email and password from request body
  const { email, password } = req.body;
  //call the service layer to handle the log in logic and generate an access token
  const accessToken = await logIn(email, password);
  //send the access token back in the response
  res.status(200).json({ accessToken });
}
