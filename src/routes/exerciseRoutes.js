import express from 'express';
import {
  getAllExercisesHandler,
  getExerciseByIdHandler,
  createExerciseHandler,
  updateExerciseHandler,
  deleteExerciseHandler,
} from '../controllers/exerciseController.js';
import {
  authenticate,
  authenticateOptional,
} from '../middleware/authenticate.js';
import { authorizeExerciseOwnership } from '../middleware/authorizeOwnership.js';
import {
  validateCreateExercise,
  validateUpdateExercise,
  validateGetExerciseById,
  validateDeleteExercise,
} from '../middleware/exerciseValidators.js';

const router = express.Router();

//retrieves all exercises (public but filters by user if authenticated)
router.get('/', authenticateOptional, getAllExercisesHandler);
//retrieves a specific exercise by ID
router.get(
  '/:id',
  validateGetExerciseById,
  authenticate,
  authorizeExerciseOwnership,
  getExerciseByIdHandler,
);
//creates a new exercise (requires authentication)
router.post('/', authenticate, validateCreateExercise, createExerciseHandler);
//updates an existing exercise by ID (requires authentication)
router.put(
  '/:id',
  validateUpdateExercise,
  authenticate,
  authorizeExerciseOwnership,
  updateExerciseHandler,
);
//deletes an exercise by ID (requires authentication)
router.delete(
  '/:id',
  validateDeleteExercise,
  authenticate,
  authorizeExerciseOwnership,
  deleteExerciseHandler,
);

export default router;
