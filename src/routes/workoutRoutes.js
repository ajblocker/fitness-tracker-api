import express from 'express';
import {
  getAllWorkoutsHandler,
  getWorkoutByIdHandler,
  createWorkoutHandler,
  updateWorkoutHandler,
  deleteWorkoutHandler,
} from '../controllers/workoutController.js';
import {
  authenticate,
  authenticateOptional,
} from '../middleware/authenticate.js';
import { authorizeWorkoutOwnership } from '../middleware/authorizeOwnership.js';
import {
  validateCreateWorkout,
  validateUpdateWorkout,
  validateGetWorkoutById,
  validateDeleteWorkout,
} from '../middleware/workoutValidators.js';

const router = express.Router();

//retrieves all workouts (public but filters by user if authenticated)
router.get('/', authenticateOptional, getAllWorkoutsHandler);
//get a specific workout by ID
router.get(
  '/:id',
  validateGetWorkoutById,
  authenticate,
  authorizeWorkoutOwnership,
  getWorkoutByIdHandler,
);
//create a new workout
router.post('/', authenticate, validateCreateWorkout, createWorkoutHandler);
//update an existing workout by ID
router.put(
  '/:id',
  validateUpdateWorkout,
  authenticate,
  authorizeWorkoutOwnership,
  updateWorkoutHandler,
);
//delete a workout by ID
router.delete(
  '/:id',
  validateDeleteWorkout,
  authenticate,
  authorizeWorkoutOwnership,
  deleteWorkoutHandler,
);

export default router;
