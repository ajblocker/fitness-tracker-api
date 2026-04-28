import prisma from '../config/db.js';

//retrieve all goals from the database
export async function getAllGoals(
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
    searchConditions = [
      { title: { contains: search, mode: 'insensitive' } },
      { goalType: { contains: search, mode: 'insensitive' } },
      { unit: { contains: search, mode: 'insensitive' } },
      { deadline: { contains: search, mode: 'insensitive' } },
    ];

    //only add numeric search if the search term is a valid number
    if (!isNaN(searchNum) && searchNum.toString() === search.trim()) {
      searchConditions.push({ targetValue: searchNum });
    }
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

  //query the database to retrieve goals based on the constructed conditions, sorting, and pagination parameters
  const goals = await prisma.goal.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    skip: offset,
    take: limit,
  });
  return goals;
}

//retrieve a specific goal by ID
export async function getGoalById(id) {
  const goal = await prisma.goal.findUnique({
    where: { id },
  });
  return goal;
}

//create a new goal in the database
export async function createGoal(goalData) {
  const newGoal = prisma.goal.create({
    data: goalData,
  });
  return newGoal;
}

//update an existing goal in the database
export async function updateGoal(id, updatedData) {
  try {
    const updatedGoal = await prisma.goal.update({
      where: { id },
      data: updatedData,
    });
    return updatedGoal;
  } catch (error) {
    //if the error code is P2025, no record was found to update, return null instead of throwing an error
    if (error.code === 'P2025') return null;
    throw error;
  }
}

// delete a goal from the database
export async function deleteGoal(id) {
  try {
    const deletedGoal = await prisma.goal.delete({
      where: { id },
    });
    return deletedGoal;
  } catch (error) {
    //if the error code is P2025, no record was found to delete, so return null
    if (error.code === 'P2025') return null;
    throw error;
  }
}
