import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

//validation middleware for creating a goal
export const validateCreateGoal = [
  body('title')
    .exists()
    .withMessage('Goal title is required')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Goal title must be between 1 and 255 characters'),

  body('goalType')
    .exists()
    .withMessage('Goal type is required')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Goal type must be between 1 and 100 characters'),

  body('targetValue')
    .exists()
    .withMessage('Target value is required')
    .isInt({ min: 0 })
    .withMessage('Target value must be a non-negative integer'),

  body('unit')
    .exists()
    .withMessage('Unit is required')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Unit must be between 1 and 50 characters'),

  body('deadline')
    .exists()
    .withMessage('Deadline is required')
    .trim()
    .isISO8601()
    .withMessage('Deadline must be a valid date'),

  body('status')
    .optional()
    .isIn(['ACTIVE', 'ACHIEVED', 'ABANDONED'])
    .withMessage('Status must be ACTIVE, ACHIEVED, or ABANDONED'),

  handleValidationErrors,
];

//validation middleware for updating a goal
export const validateUpdateGoal = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Goal ID must be a positive integer'),

  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Goal title must be between 1 and 255 characters'),

  body('goalType')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Goal type must be between 1 and 100 characters'),

  body('targetValue')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Target value must be a non-negative integer'),

  body('unit')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Unit must be between 1 and 50 characters'),

  body('deadline')
    .optional()
    .trim()
    .isISO8601()
    .withMessage('Deadline must be a valid date'),

  body('status')
    .optional()
    .isIn(['ACTIVE', 'ACHIEVED', 'ABANDONED'])
    .withMessage('Status must be ACTIVE, ACHIEVED, or ABANDONED'),

  handleValidationErrors,
];

//validation middleware for getting goal by ID
export const validateGetGoalById = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Goal ID must be a positive integer'),

  handleValidationErrors,
];

//validation middleware for deleting goal
export const validateDeleteGoal = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Goal ID must be a positive integer'),

  handleValidationErrors,
];
