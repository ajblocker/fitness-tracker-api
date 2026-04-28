import {
  getAllGoalsService,
  createGoalService,
  updateGoalService,
  deleteGoalService,
  getGoalByIdService,
} from '../services/goalService.js';

//controller function to handle GET /api/goals requests
export async function getAllGoalsHandler(req, res) {
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
  //call the service function to retrieve goals based on the provided options
  //if user is authenticated, filter by their userId, otherwise return all
  let goals = await getAllGoalsService(req.user?.id, options);
  res.status(200).json(goals);
}

//controller function to handle GET /api/goals/:id requests
export async function getGoalsByIdHandler(req, res) {
  //extract the goal ID from the request parameters and convert it to an integer
  const id = parseInt(req.params.id);
  //call the service function to retrieve the goal with the specified ID
  const goal = await getGoalByIdService(id);
  res.status(200).json(goal);
}

//controller function to handle POST /api/goals requests
export async function createGoalHandler(req, res) {
  //extract goal details from request body
  const { title, goalType, targetValue, unit, deadline } = req.body;
  //get the authenticated user's ID from the request object
  const userId = req.user.id;

  //call the service function to create a new goal with the provided title and description
  const newGoal = await createGoalService({
    title,
    goalType,
    targetValue,
    unit,
    deadline,
    user: {
      connect: { id: userId },
    },
  });
  res.status(201).json(newGoal);
}

//controller function to handle PUT /api/goals/:id requests
export async function updateGoalHandler(req, res) {
  //extract the goal ID from the request parameters and convert it to an integer
  const id = parseInt(req.params.id);
  //extract updated goal details from request body
  const { title, goalType, targetValue, unit, deadline, status } = req.body;

  //call the service function to update the goal with the specified ID and updated data
  const updatedGoal = await updateGoalService(id, {
    title,
    goalType,
    targetValue,
    unit,
    deadline,
    status,
  });
  res.status(200).json(updatedGoal);
}

//controller function to handle DELETE /api/goals/:id requests
export async function deleteGoalHandler(req, res) {
  //extract the goal ID from the request parameters and convert it to an integer
  const id = parseInt(req.params.id);
  //call the service function to delete the goal with the specified ID
  const deletedGoal = await deleteGoalService(id);
  res.status(200).json(deletedGoal);
}
