import {
  createGoal,
  getAllGoals,
  updateGoal,
  deleteGoal,
  getGoalById,
} from '../repositories/goalRepo.js';

//service function to retrieve all goals with optional search, sorting, and pagination parameters
export async function getAllGoalsService(userId, options) {
  //calls the repository function to retrieve goals based on the provided options
  return await getAllGoals(
    userId,
    options.search,
    options.sortBy,
    options.order,
    options.offset,
    options.limit,
  );
}

//service function to retrieve a specific goal by ID
export async function getGoalByIdService(id) {
  //call the repository function to retrieve the goal with the specified ID
  const goal = await getGoalById(id);
  //if no goal is found with the specified ID, throw a 404 error
  if (!goal) {
    const error = new Error(`Goal ${id} not found`);
    error.status = 404;
    throw error;
  }
  return goal;
}

//service function to create a new goal with the provided goal data
export async function createGoalService(goalData) {
  return createGoal(goalData);
}

export async function updateGoalService(id, updatedData) {
  //call the repository function to update the goal with the specified ID and updated data
  const updatedGoal = await updateGoal(id, updatedData);
  //if no goal is found with the specified ID, throw a 404 error
  if (!updatedGoal) {
    const error = new Error(`Goal ${id} not found`);
    error.status = 404;
    throw error;
  }
  return updatedGoal;
}

//service function to delete a goal by ID
export async function deleteGoalService(id) {
  //call the repository function to delete the goal with the specified ID
  const deletedGoal = await deleteGoal(id);
  //if no goal is found with the specified ID, throw a 404 error
  if (!deletedGoal) {
    const error = new Error(`Goal ${id} not found`);
    error.status = 404;
    throw error;
  }
  return deletedGoal;
}
