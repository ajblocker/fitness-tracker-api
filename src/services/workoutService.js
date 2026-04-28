import {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from '../repositories/workoutRepo.js';

//service function to retrieve all workouts with optional filtering, sorting, and pagination parameters
export async function getAllWorkoutsService(userId, options) {
  //calls the repository function to retrieve workouts based on the provided options
  return await getAllWorkouts(
    userId,
    options.workoutId,
    options.exerciseId,
    options.search,
    options.sortBy,
    options.order,
    options.offset,
    options.limit,
  );
}

//service function to retrieve a specific workout by ID
export async function getWorkoutByIdService(id) {
  //calls the repository function to retrieve the workout with the specified ID
  const workout = await getWorkoutById(id);
  //if no workout is found with the specified ID, throw a 404 error
  if (!workout) {
    const error = new Error(`Workout ${id} not found`);
    error.status = 404;
    throw error;
  }
  return workout;
}

//service function to create a new workout
export async function createWorkoutService(workoutData) {
  return createWorkout(workoutData);
}

//service function to update an existing workout by ID
export async function updateWorkoutService(id, updatedData) {
  //call the repository function to update the workout with the specified ID and updated data
  const updatedWorkout = await updateWorkout(id, updatedData);
  //if no workout is found with the specified ID, throw a 404 error
  if (!updatedWorkout) {
    const error = new Error(`Workout ${id} not found`);
    error.status = 404;
    throw error;
  }
  return updatedWorkout;
}

//service function to delete a workout by ID
export async function deleteWorkoutService(id) {
  //call the repository function to delete the workout with the specified ID
  const deletedWorkout = await deleteWorkout(id);
  //if no workout is found with the specified ID, throw a 404 error
  if (!deletedWorkout) {
    const error = new Error(`Workout ${id} not found`);
    error.status = 404;
    throw error;
  }
  return deletedWorkout;
}
