import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

//validation middleware for creating an exercise
export const validateCreateExercise = [
  body('name')
    .exists()
    .withMessage('Exercise name is required')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Exercise name must be between 1 and 255 characters'),

  body('category')
    .exists()
    .withMessage('Category is required')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Category must be between 1 and 100 characters'),

  body('muscleGroup')
    .exists()
    .withMessage('Muscle group is required')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Muscle group must be between 1 and 100 characters'),

  body('equipment')
    .exists()
    .withMessage('Equipment is required')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Equipment must be between 1 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),

  handleValidationErrors,
];

//validation middleware for updating an exercise
export const validateUpdateExercise = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Exercise ID must be a positive integer'),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Exercise name must be between 1 and 255 characters'),

  body('category')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Category must be between 1 and 100 characters'),

  body('muscleGroup')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Muscle group must be between 1 and 100 characters'),

  body('equipment')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Equipment must be between 1 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),

  handleValidationErrors,
];

//validation middleware for getting exercise by ID
export const validateGetExerciseById = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Exercise ID must be a positive integer'),

  handleValidationErrors,
];

//validation middleware for deleting exercise
export const validateDeleteExercise = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Exercise ID must be a positive integer'),

  handleValidationErrors,
];
