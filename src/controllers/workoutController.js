import { parse } from 'dotenv';
import {
  getAllWorkoutsService,
  getWorkoutByIdService,
  createWorkoutService,
  updateWorkoutService,
  deleteWorkoutService,
} from '../services/workoutService.js';

//controller function to handle GET /api/workout-session requests
export async function getAllWorkoutsHandler(req, res) {
  //extract query parameters for filtering, sorting, and pagination
  const {
    workoutId,
    exerciseId,
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 10,
  } = req.query;
  //construct options object to pass to the service layer
  const options = {
    workoutId,
    exerciseId,
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  //call the service function to retrieve workouts based on the provided options
  //if user is authenticated, filter by their userId, otherwise return all
  let workouts = await getAllWorkoutsService(req.user?.id, options);
  res.status(200).json(workouts);
}

//controller function to handle GET /api/workout-session/:id requests
export async function getWorkoutByIdHandler(req, res) {
  //extract the workout ID from the request parameters and convert it to an integer
  const id = parseInt(req.params.id);
  //call the service function to retrieve the workout with the specified ID
  const workout = await getWorkoutByIdService(id);
  res.status(200).json(workout);
}

//controller function to handle POST /api/workout-session requests
export async function createWorkoutHandler(req, res) {
  //extract workout details from request body
  const { workoutId, exerciseId, weight, reps, sets, durationSeconds, notes } =
    req.body;
  //get the authenticated user's ID from the request object
  const userId = req.user.id;
  //call the service function to create a new workout with the provided details
  const newWorkout = await createWorkoutService({
    workoutId: parseInt(workoutId),
    exerciseId: parseInt(exerciseId),
    weight: parseInt(weight),
    reps: parseInt(reps),
    sets: parseInt(sets),
    durationSeconds: parseInt(durationSeconds),
    notes: notes || null,
  });
  res.status(201).json(newWorkout);
}

//controller function to handle PUT /api/workout-session/:id requests
export async function updateWorkoutHandler(req, res) {
  //extract the workout ID from the request parameters and convert it to an integer
  const id = parseInt(req.params.id);
  //extract updated workout details from request body
  const { weight, reps, sets, durationSeconds, notes } = req.body;
  //call the service function to update the workout with the specified ID and updated details
  const updatedWorkout = await updateWorkoutService(id, {
    weight: parseInt(weight),
    reps: parseInt(reps),
    sets: parseInt(sets),
    durationSeconds: parseInt(durationSeconds),
    notes: notes || null,
  });
  res.status(200).json(updatedWorkout);
}

//controller function to handle DELETE /api/workout-session/:id requests
export async function deleteWorkoutHandler(req, res) {
  //extract the workout ID from the request parameters and convert it to an integer
  const id = parseInt(req.params.id);
  //call the service function to delete the workout with the specified ID
  const deletedWorkout = await deleteWorkoutService(id);
  res.status(200).json(deletedWorkout);
}
