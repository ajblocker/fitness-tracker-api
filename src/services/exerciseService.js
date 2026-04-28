import {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
} from '../repositories/exerciseRepo.js';

//service function to retrieve all exercises with optional search, sorting, and pagination parameters
export async function getAllExercisesService(userId, options) {
  //calls the repository function to retrieve exercises based on the provided options
  return await getAllExercises(
    userId,
    options.search,
    options.sortBy,
    options.order,
    options.offset,
    options.limit,
  );
}

//service function to retrieve a specific exercise by ID
//calls the repository function to retrieve the exercise with the specified ID
export async function getExerciseByIdService(id) {
  const exercise = await getExerciseById(id);
  //if no exercise is found with the specified ID, throw a 404 error
  if (!exercise) {
    const error = new Error(`Exercise ${id} not found`);
    error.status = 404;
    throw error;
  }
  return exercise;
}

//service function to create a new exercise with the provided exercise data
export async function createExerciseService(exerciseData) {
  return createExercise(exerciseData);
}

//service function to update an existing exercise by ID
export async function updateExerciseService(id, updatedData) {
  //calls the repository function to update the exercise with the specified ID
  const updatedExercise = await updateExercise(id, updatedData);
  //if no exercise is found with the specified ID, throw a 404 error
  if (!updatedExercise) {
    const error = new Error(`Exercise ${id} not found`);
    error.status = 404;
    throw error;
  }
  return updatedExercise;
}

//service function to delete an exercise by ID
export async function deleteExerciseService(id) {
  //calls the repository function to delete the exercise with the specified ID
  const deletedExercise = await deleteExercise(id);
  //if no exercise is found with the specified ID, throw a 404 error
  if (!deletedExercise) {
    const error = new Error(`Exercise ${id} not found`);
    error.status = 404;
    throw error;
  }
  return deletedExercise;
}
