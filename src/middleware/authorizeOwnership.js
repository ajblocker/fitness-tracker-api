import { getWorkoutSessionByIdService } from '../services/workoutSessionService.js';
import { getExerciseByIdService } from '../services/exerciseService.js';
import { getGoalByIdService } from '../services/goalService.js';
import { getWorkoutByIdService } from '../services/workoutService.js';

//create authorization middleware for a specific service
export function createAuthorizeOwnership(getByIdService) {
  return async (req, res, next) => {
    try {
      //extract the resource ID from the request parameters
      const id = parseInt(req.params.id);
      //check if the resource belongs to the authenticated user
      const resource = await getByIdService(id);
      //if resource is not found, return 404
      if (resource.userId != req.user.id) {
        const error = new Error('Forbidden: insufficient permission.');
        error.status = 403;
        return next(error);
      }
      //if ownership is verified, proceed to the next middleware or route handler
      next();
    } catch (error) {
      next(error);
    }
  };
}

//specific middleware for each resource
export const authorizeExerciseOwnership = createAuthorizeOwnership(
  getExerciseByIdService,
);
export const authorizeGoalOwnership =
  createAuthorizeOwnership(getGoalByIdService);
export const authorizeWorkoutSessionOwnership = createAuthorizeOwnership(
  getWorkoutSessionByIdService,
);

//authorization for workouts - userId is nested in workoutSessions relationship
export async function authorizeWorkoutOwnership(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const workout = await getWorkoutByIdService(id);

    //for workouts, check userId through the workoutSessions relationship
    if (
      !workout.workoutSessions ||
      workout.workoutSessions.userId !== req.user.id
    ) {
      const error = new Error('Forbidden: insufficient permission.');
      error.status = 403;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
}

//legacy export for backward compatibility
export async function authorizeOwnership(req, res, next) {
  return authorizeWorkoutSessionOwnership(req, res, next);
}
