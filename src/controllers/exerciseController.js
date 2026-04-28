import {
  getAllExercisesService,
  getExerciseByIdService,
  createExerciseService,
  updateExerciseService,
  deleteExerciseService,
} from '../services/exerciseService.js';

//controller function to handle GET /api/exercises requests
export async function getAllExercisesHandler(req, res) {
  //extract query parameters for filtering, sorting, and pagination
  const {
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 10,
  } = req.query;
  //construct options object to pass to the service layer
  const options = {
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  //call the service function to retrieve exercises based on the provided options
  //if user is authenticated, filter by their userId, otherwise return all
  let exercises = await getAllExercisesService(req.user?.id, options);
  res.status(200).json(exercises);
}

//controller function to handle GET /api/exercises/:id requests
export async function getExerciseByIdHandler(req, res) {
  //extract the exercise ID from the request parameters and convert it to an integer
  const id = parseInt(req.params.id);
  //call the service function to retrieve the exercise with the specified ID
  const exercise = await getExerciseByIdService(id);
  res.status(200).json(exercise);
}

export async function createExerciseHandler(req, res) {
  //extract exercise details from request body
  const { name, category, muscleGroup, equipment, description } = req.body;
  const userId = req.user.id;
  //call the service function to create a new exercise with the provided details
  const newExercise = await createExerciseService({
    name,
    category,
    muscleGroup,
    equipment,
    description,
    user: {
      connect: { id: userId },
    },
  });
  res.status(201).json(newExercise);
}

//controller function to handle PUT /api/exercises/:id requests
export async function updateExerciseHandler(req, res) {
  //extract the exercise ID from the request parameters and convert it to an integer
  const id = parseInt(req.params.id);
  //extract updated exercise details from request body
  const { name, category, muscleGroup, equipment, description } = req.body;
  //call the service function to update the exercise with the specified ID and updated details
  const updatedExercise = await updateExerciseService(id, {
    name,
    category,
    muscleGroup,
    equipment,
    description,
  });
  res.status(200).json(updatedExercise);
}

//controller function to handle DELETE /api/exercises/:id requests
export async function deleteExerciseHandler(req, res) {
  //extract the exercise ID from the request parameters and convert it to an integer
  const id = parseInt(req.params.id);
  //call the service function to delete the exercise with the specified ID
  const deletedExercise = await deleteExerciseService(id);
  res.status(200).json(deletedExercise);
}
