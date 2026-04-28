import prisma from '../config/db.js';

//get all workouts from the database with optional filtering, sorting, and pagination
export async function getAllWorkouts(
  userId,
  workoutId,
  exerciseId,
  search,
  sortBy,
  order,
  offset,
  limit,
) {
  //construct conditions object for filtering
  const conditions = {};

  //build base conditions
  if (userId) {
    conditions.workoutSessions = {
      userId,
    };
  }
  if (workoutId) {
    conditions.id = Number(workoutId);
  }
  if (exerciseId) {
    conditions.exerciseId = Number(exerciseId);
  }

  //build search conditions if search is provided
  let searchConditions = null;
  if (search) {
    searchConditions = [{ notes: { contains: search, mode: 'insensitive' } }];
  }

  //if we have search conditions and existing conditions, use AND to combine them
  if (searchConditions && (userId || workoutId || exerciseId)) {
    //wrap existing conditions in AND with search OR
    const existingConditions = { ...conditions };
    conditions.AND = [
      existingConditions,
      { OR: searchConditions },
    ];
  } else if (searchConditions) {
    //if only search is provided
    conditions.OR = searchConditions;
  }

  //query the database to retrieve workouts based on the constructed conditions, sorting, and pagination parameters
  const workouts = await prisma.workout.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    skip: offset,
    take: limit,
  });
  return workouts;
}

//retrieve a specific workout by ID
export async function getWorkoutById(id) {
  const workout = await prisma.workout.findUnique({
    where: { id },
    include: {
      workoutSessions: true,
    },
  });
  return workout;
}

//create a new workout in the database
export async function createWorkout(workoutData) {
  const newWorkout = await prisma.workout.create({
    data: workoutData,
  });
  return newWorkout;
}

//update an existing workout in the database
export async function updateWorkout(id, updatedData) {
  try {
    const updatedWorkout = await prisma.workout.update({
      where: { id },
      data: updatedData,
    });
    return updatedWorkout;
  } catch (error) {
    //if the error code is P2025, no record was found to update, return null instead of throwing an error
    if (error.code === 'P2025') return null;
    throw error;
  }
}

// delete a workout from the database
export async function deleteWorkout(id) {
  try {
    const deletedWorkout = await prisma.workout.delete({
      where: { id },
    });
    return deletedWorkout;
  } catch (error) {
    //if the error code is P2025, no record was found to delete, return null instead of throwing an error
    if (error.code === 'P2025') return null;
    throw error;
  }
}
