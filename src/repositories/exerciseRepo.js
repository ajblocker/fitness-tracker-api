import prisma from '../config/db.js';

//retrieve all exercises from the database
export async function getAllExercises(
  userId,
  search,
  sortBy,
  order,
  offset,
  limit,
) {
  //construct conditions object for filtering based on userId (if provided) and search query
  const conditions = {};

  //build search conditions if search is provided
  let searchConditions = null;
  if (search) {
    searchConditions = [
      { name: { contains: search, mode: 'insensitive' } },
      { category: { contains: search, mode: 'insensitive' } },
      { muscleGroup: { contains: search, mode: 'insensitive' } },
      { equipment: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  //combine userId and search conditions properly
  if (userId && searchConditions) {
    //if both userId and search are provided, use AND with OR for search
    conditions.AND = [{ userId }, { OR: searchConditions }];
  } else if (userId) {
    //if only userId is provided
    conditions.userId = userId;
  } else if (searchConditions) {
    //if only search is provided
    conditions.OR = searchConditions;
  }

  //query the database to retrieve exercises based on the constructed conditions, sorting, and pagination parameters
  const exercises = await prisma.exercise.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    skip: offset,
    take: limit,
  });
  return exercises;
}

//retrieve a specific exercise by ID
export async function getExerciseById(id) {
  const exercise = await prisma.exercise.findUnique({
    where: { id },
  });
  return exercise;
}

//create a new exercise in the database
export async function createExercise(exerciseData) {
  const newExercise = prisma.exercise.create({
    data: exerciseData,
  });
  return newExercise;
}

//update an existing exercise in the database
export async function updateExercise(id, updatedData) {
  try {
    const updatedExercise = await prisma.exercise.update({
      where: { id },
      data: updatedData,
    });
    return updatedExercise;
  } catch (error) {
    //if the error code is P2025, no record was found to update, return null instead of throwing an error
    if (error.code === 'P2025') return null;
    throw error;
  }
}

// delete an exercise from the database
export async function deleteExercise(id) {
  try {
    const deletedExercise = await prisma.exercise.delete({
      where: { id },
    });
    return deletedExercise;
  } catch (error) {
    //if the error code is P2025, no record was found to delete, return null instead of throwing an error
    if (error.code === 'P2025') return null;
    throw error;
  }
}
