import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

//initializes the Prisma Client and exports it for use in the rest of the application
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
//connects client to the database
const prisma = new PrismaClient({ adapter });

export default prisma;
