import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

//validation middleware for creating a workout session
export const validateCreateWorkoutSession = [
  body('title')
    .exists()
    .withMessage('Workout session title is required')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes must not exceed 500 characters'),

  body('workoutDate')
    .exists()
    .withMessage('Workout date is required')
    .trim()
    .isISO8601()
    .withMessage('Workout date must be a valid date'),

  body('durationMinutes')
    .exists()
    .withMessage('Duration (in minutes) is required')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),

  handleValidationErrors,
];

//validation middleware for updating a workout session
export const validateUpdateWorkoutSession = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Workout session ID must be a positive integer'),

  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes must not exceed 500 characters'),

  body('workoutDate')
    .optional()
    .trim()
    .isISO8601()
    .withMessage('Workout date must be a valid date'),

  body('durationMinutes')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),

  handleValidationErrors,
];

//validation middleware for getting workout session by ID
export const validateGetWorkoutSessionById = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Workout session ID must be a positive integer'),

  handleValidationErrors,
];

//validation middleware for deleting workout session
export const validateDeleteWorkoutSession = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Workout session ID must be a positive integer'),

  handleValidationErrors,
];
