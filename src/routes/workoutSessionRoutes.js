import express from 'express';
import {
  createWorkoutSessionHandler,
  getAllWorkoutSessionsHandler,
  getWorkoutSessionByIdHandler,
  updateWorkoutSessionHandler,
  deleteWorkoutSessionHandler,
} from '../controllers/workoutSessionController.js';
import {
  authenticate,
  authenticateOptional,
} from '../middleware/authenticate.js';
import { authorizeWorkoutSessionOwnership } from '../middleware/authorizeOwnership.js';
import {
  validateCreateWorkoutSession,
  validateUpdateWorkoutSession,
  validateGetWorkoutSessionById,
  validateDeleteWorkoutSession,
} from '../middleware/workoutSessionValidators.js';

const router = express.Router({ mergeParams: true });

//get all workout sessions (public but filters by user if authenticated)
router.get('/', authenticateOptional, getAllWorkoutSessionsHandler);
//get a specific workout session by ID
router.get(
  '/:id',
  validateGetWorkoutSessionById,
  authenticate,
  authorizeWorkoutSessionOwnership,
  getWorkoutSessionByIdHandler,
);
//create a new workout session
router.post(
  '/',
  authenticate,
  validateCreateWorkoutSession,
  createWorkoutSessionHandler,
);
//update an existing workout session by ID
router.put(
  '/:id',
  validateUpdateWorkoutSession,
  authenticate,
  authorizeWorkoutSessionOwnership,
  updateWorkoutSessionHandler,
);
//delete a workout session by ID
router.delete(
  '/:id',
  validateDeleteWorkoutSession,
  authenticate,
  authorizeWorkoutSessionOwnership,
  deleteWorkoutSessionHandler,
);

export default router;
