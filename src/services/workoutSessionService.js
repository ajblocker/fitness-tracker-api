import {
  getAllWorkoutSessions,
  getWorkoutSessionById,
  createWorkoutSession,
  updateWorkoutSession,
  deleteWorkoutSession,
} from '../repositories/workoutSessionRepo.js';

//service function to retrieve all workout sessions with optional search, sorting, and pagination parameters
export async function getAllWorkoutSessionsService(userId, options) {
  //calls the repository function to retrieve workout sessions based on the provided options
  return await getAllWorkoutSessions(
    userId,
    options.search,
    options.sortBy,
    options.order,
    options.offset,
    options.limit,
  );
}

//service function to retrieve a specific workout session by ID
export async function getWorkoutSessionByIdService(id) {
  //calls the repository function to retrieve the workout session with the specified ID
  const workoutSession = await getWorkoutSessionById(id);
  //if no workout session is found with the specified ID, throw a 404 error
  if (!workoutSession) {
    const error = new Error(`Workout session ${id} not found`);
    error.status = 404;
    throw error;
  }
  return workoutSession;
}

//service function to create a new workout session
export async function createWorkoutSessionService(workoutSessionData) {
  return createWorkoutSession(workoutSessionData);
}

//service function to update an existing workout session by ID
export async function updateWorkoutSessionService(id, updatedData) {
  //call the repository function to update the workout session
  const updatedWorkoutSession = await updateWorkoutSession(id, updatedData);
  //if no workout session is found with the specified ID, throw a 404 error
  if (!updatedWorkoutSession) {
    const error = new Error(`Workout session ${id} not found`);
    error.status = 404;
    throw error;
  }
  return updatedWorkoutSession;
}

//service function to delete a workout session by ID
export async function deleteWorkoutSessionService(id) {
  //call the repository function to delete the workout session with the specified ID
  const deletedWorkoutSession = await deleteWorkoutSession(id);
  //if no workout session is found with the specified ID, throw a 404 error
  if (!deletedWorkoutSession) {
    const error = new Error(`Workout session ${id} not found`);
    error.status = 404;
    throw error;
  }
  return deletedWorkoutSession;
}
