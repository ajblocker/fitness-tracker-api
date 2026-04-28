import prisma from '../config/db.js';
import bcrypt from 'bcrypt';

// function to create a new user
export async function createUser(data) {
  try {
    //create the user in the database, omitting the password hash from the returned object
    const newUser = await prisma.user.create({
      data,
      omit: { passwordHash: true },
    });
    return newUser;
  } catch (error) {
    //handle unique constraint violation for email field
    if (error.code === 'P2002') {
      const err = new Error('Email has already been used');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

//find a user by their email address
export async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

//retrieve all users from the database, omitting their password hashes, with optional filtering, sorting, and pagination
export async function findAllUsers(search, sortBy, order, offset, limit) {
  //construct conditions object for filtering based on search query
  const conditions = {};

  //if a search query is provided, add OR conditions to filter users
  if (search) {
    conditions.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { role: { equals: search } },
    ];
  }

  //retrieve all users omitting password, with filtering, sorting, and pagination
  return prisma.user.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    skip: offset,
    take: limit,
    omit: { passwordHash: true },
  });
}

//find a user by their unique ID, omitting their password
export async function findUserById(id) {
  //find user by id, omit password
  return prisma.user.findUnique({
    where: { id },
    omit: { passwordHash: true },
  });
}

//update a user by their ID with handling for password updates
export async function updateUserById(id, updateData) {
  try {
    //if the update data includes a new password, hash it before updating
    if (updateData.passwordHash) {
      //hash the new password with bcrypt
      const hashedPassword = await bcrypt.hash(updateData.passwordHash, 10);
      //replace the plain text password in the update data with the hashed version
      updateData.passwordHash = hashedPassword;
    }
    //update user by id, omit password
    return await prisma.user.update({
      where: { id },
      data: updateData,
      omit: { passwordHash: true },
    });
    return updatedUser;
  } catch (error) {
    //handle case where user to update is not found
    if (error.code === 'P2025') {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }
    //handle unique constraint violation for email field
    if (error.code === 'P2002') {
      const err = new Error('Email has already been used');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

//delete a user by ID with error handling for not found case
export async function deleteUserById(id) {
  try {
    //delete user by id
    return await prisma.user.delete({ where: { id } });
  } catch (error) {
    //handle case where user to delete is not found
    if (error.code === 'P2025') {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }
    throw error;
  }
}
