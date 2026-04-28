import {
  createWorkoutSessionService,
  getAllWorkoutSessionsService,
  getWorkoutSessionByIdService,
  updateWorkoutSessionService,
  deleteWorkoutSessionService,
} from '../services/workoutSessionService.js';

export async function getAllWorkoutSessionsHandler(req, res) {
  // extract query parameters for search, sorting, and pagination
  const {
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 10,
  } = req.query;

  // construct options object to pass to the service layer
  const options = {
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  // call the service function to retrieve workout sessions
  //if user is authenticated, filter by their userId, otherwise return all
  let workoutSessions = await getAllWorkoutSessionsService(
    req.user?.id,
    options,
  );
  res.status(200).json(workoutSessions);
}

// handler for GET /api/workout-session/:id
export async function getWorkoutSessionByIdHandler(req, res) {
  // extract the workout session ID from the request parameters and convert it to an integer
  const id = parseInt(req.params.id);
  // call the service function to retrieve the workout session with the specified ID
  const workoutSession = await getWorkoutSessionByIdService(id);
  res.status(200).json(workoutSession);
}

// handler for POST /api/workout-session
export async function createWorkoutSessionHandler(req, res) {
  // extract workout session details from the request body
  const { title, notes, durationMinutes, workoutDate } = req.body;
  // get the authenticated user's ID
  const userId = req.user.id;
  // call the service function to create a new workout session with the provided details and associate it with the authenticated user
  const newWorkoutSession = await createWorkoutSessionService({
    title,
    notes,
    durationMinutes,
    workoutDate,
    user: {
      connect: { id: userId },
    },
  });
  res.status(201).json(newWorkoutSession);
}

// handler for PUT /api/workout-session/:id
export async function updateWorkoutSessionHandler(req, res) {
  // extract the workout session ID from the request parameters and convert it to an integer
  const id = parseInt(req.params.id);
  // extract updated workout session details from the request body
  const { title, notes, durationMinutes, workoutDate } = req.body;
  // call the service function to update the workout session with the specified ID using the provided details
  const updatedWorkoutSession = await updateWorkoutSessionService(id, {
    title,
    notes,
    durationMinutes,
    workoutDate,
  });
  res.status(200).json(updatedWorkoutSession);
}

// handler for DELETE /api/workout-session/:id
export async function deleteWorkoutSessionHandler(req, res) {
  // extract the workout session ID from the request parameters and convert it to an integer
  const id = parseInt(req.params.id);
  // call the service function to delete the workout session with the specified ID
  await deleteWorkoutSessionService(id);
  res.status(204).send();
}
