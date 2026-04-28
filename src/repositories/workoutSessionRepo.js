import prisma from '../config/db.js';

//retrieve all workout sessions from the database
export async function getAllWorkoutSessions(
  userId,
  search,
  sortBy,
  order,
  offset,
  limit,
) {
  //construct conditions object for filtering based on userId (if provided) and search query
  const conditions = {};

  //build search conditions if search is provided
  let searchConditions = null;
  if (search) {
    const searchNum = parseInt(search);
    const conditions_arr = [
      { title: { contains: search, mode: 'insensitive' } },
      { notes: { contains: search, mode: 'insensitive' } },
      { workoutDate: { contains: search } },
    ];

    //only add numeric search if the search term is a valid number
    if (!isNaN(searchNum) && searchNum.toString() === search.trim()) {
      conditions_arr.push({ durationMinutes: searchNum });
    }
    searchConditions = conditions_arr;
  }

  //combine userId and search conditions properly
  if (userId && searchConditions) {
    //if both userId and search are provided, use AND with OR for search
    conditions.AND = [{ userId }, { OR: searchConditions }];
  } else if (userId) {
    //if only userId is provided
    conditions.userId = userId;
  } else if (searchConditions) {
    //if only search is provided
    conditions.OR = searchConditions;
  }
  //query the database to retrieve workout sessions based on the constructed conditions, sorting, and pagination parameters
  const workoutSessions = await prisma.workoutSession.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    skip: offset,
    take: limit,
  });
  return workoutSessions;
}

//retrieve a specific workout session by ID
export async function getWorkoutSessionById(id) {
  const workoutSession = await prisma.workoutSession.findUnique({
    where: { id },
  });
  return workoutSession;
}

// create a new workout session in the database
export async function createWorkoutSession(workoutSessionData) {
  const newWorkoutSession = prisma.workoutSession.create({
    data: workoutSessionData,
  });
  return newWorkoutSession;
}

//update an existing workout session in the database
export async function updateWorkoutSession(id, updatedData) {
  try {
    const updatedWorkoutSession = await prisma.workoutSession.update({
      where: { id },
      data: updatedData,
    });
    return updatedWorkoutSession;
  } catch (error) {
    //if the error code is P2025, no record was found to update, return null instead of throwing an error
    if (error.code === 'P2025') return null;
    throw error;
  }
}

//delete a workout session from the database
export async function deleteWorkoutSession(id) {
  try {
    const deleteWorkoutSession = await prisma.workoutSession.delete({
      where: { id },
    });
    return deleteWorkoutSession;
  } catch (error) {
    //if the error code is P2025, no record was found to delete, return null instead of throwing an error
    if (error.code === 'P2025') return null;
    throw error;
  }
}
