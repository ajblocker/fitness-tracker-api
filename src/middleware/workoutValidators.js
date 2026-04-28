import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

//validation middleware for creating a workout
export const validateCreateWorkout = [
  body('workoutId')
    .exists()
    .withMessage('Workout session ID is required')
    .isInt({ min: 1 })
    .withMessage('Workout session ID must be a positive integer'),

  body('exerciseId')
    .exists()
    .withMessage('Exercise ID is required')
    .isInt({ min: 1 })
    .withMessage('Exercise ID must be a positive integer'),

  body('sets')
    .exists()
    .withMessage('Sets is required')
    .isInt({ min: 1 })
    .withMessage('Sets must be a positive integer'),

  body('reps')
    .exists()
    .withMessage('Reps is required')
    .isInt({ min: 1 })
    .withMessage('Reps must be a positive integer'),

  body('weight')
    .exists()
    .withMessage('Weight is required')
    .isInt({ min: 0 })
    .withMessage('Weight must be a non-negative integer'),

  body('durationSeconds')
    .exists()
    .withMessage('Duration (in seconds) is required')
    .isInt({ min: 0 })
    .withMessage('Duration must be a non-negative integer'),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes must not exceed 500 characters'),

  handleValidationErrors,
];

//validation middleware for updating a workout
export const validateUpdateWorkout = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Workout ID must be a positive integer'),

  body('workoutId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Workout session ID must be a positive integer'),

  body('exerciseId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Exercise ID must be a positive integer'),

  body('sets')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Sets must be a positive integer'),

  body('reps')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Reps must be a positive integer'),

  body('weight')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Weight must be a non-negative integer'),

  body('durationSeconds')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Duration must be a non-negative integer'),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes must not exceed 500 characters'),

  handleValidationErrors,
];

//validation middleware for getting workout by ID
export const validateGetWorkoutById = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Workout ID must be a positive integer'),

  handleValidationErrors,
];

//validation middleware for deleting workout
export const validateDeleteWorkout = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Workout ID must be a positive integer'),

  handleValidationErrors,
];
