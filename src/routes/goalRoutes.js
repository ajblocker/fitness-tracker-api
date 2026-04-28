import express from 'express';
import {
  createGoalHandler,
  getAllGoalsHandler,
  getGoalsByIdHandler,
  updateGoalHandler,
  deleteGoalHandler,
} from '../controllers/goalController.js';
import {
  authenticate,
  authenticateOptional,
} from '../middleware/authenticate.js';
import { authorizeGoalOwnership } from '../middleware/authorizeOwnership.js';
import {
  validateCreateGoal,
  validateUpdateGoal,
  validateGetGoalById,
  validateDeleteGoal,
} from '../middleware/goalValidators.js';

const router = express.Router();

//retrieves all goals (public but filters by user if authenticated)
router.get('/', authenticateOptional, getAllGoalsHandler);
//get a specific goal by ID
router.get(
  '/:id',
  validateGetGoalById,
  authenticate,
  authorizeGoalOwnership,
  getGoalsByIdHandler,
);
//create a new goal
router.post('/', authenticate, validateCreateGoal, createGoalHandler);
//update an existing goal by ID
router.put(
  '/:id',
  validateUpdateGoal,
  authenticate,
  authorizeGoalOwnership,
  updateGoalHandler,
);
//delete a goal by ID
router.delete(
  '/:id',
  validateDeleteGoal,
  authenticate,
  authorizeGoalOwnership,
  deleteGoalHandler,
);

export default router;
