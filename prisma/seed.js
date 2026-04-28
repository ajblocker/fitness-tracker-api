import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  // ── Reset all tables in dependency order ───────────────────────────────
  await prisma.$queryRaw`TRUNCATE workouts, workout_sessions, exercises, goals, users RESTART IDENTITY CASCADE;`;

  // ── Users ──────────────────────────────────────────────────────────────
  const usersData = [
    {
      name: 'Alice',
      email: 'alice@test.com',
      password: 'alice1234',
    },
    {
      name: 'Bob',
      email: 'bob@example.com',
      password: 'bob1234',
    },
    {
      name: 'Charlie',
      email: 'charlie@demo.com',
      password: 'charlie1234',
      role: 'ADMIN',
    },
  ];

  const users = [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        passwordHash: hashedPassword,
        role: userData.role || 'USER',
      },
    });

    users.push(user);
  }

  const [alice, bob, charlie] = users;

  // Goals (2 per user)
  for (const user of users) {
    const username = user.name;
    await prisma.goal.createMany({
      data: [
        {
          userId: user.id,
          title: `${username}'s Weight Loss Goal`,
          goalType: 'weight_loss',
          targetValue: 10,
          unit: 'lbs',
          deadline: '2025-12-31',
          status: 'ACTIVE',
        },
        {
          userId: user.id,
          title: `${username}'s Strength Goal`,
          goalType: 'strength',
          targetValue: 200,
          unit: 'lbs',
          deadline: '2025-09-01',
          status: 'ACTIVE',
        },
      ],
    });
  }

  // Mark one of charlie's goals as ACHIEVED
  await prisma.goal.updateMany({
    where: { userId: charlie.id, goalType: 'strength' },
    data: { status: 'ACHIEVED' },
  });

  // Exercises (2 per user)
  const aliceSquat = await prisma.exercise.create({
    data: {
      userId: alice.id,
      name: 'Barbell Squat',
      category: 'strength',
      muscleGroup: 'legs',
      equipment: 'barbell',
      description:
        'Compound lower-body lift targeting quads, hamstrings, and glutes.',
    },
  });

  const aliceRun = await prisma.exercise.create({
    data: {
      userId: alice.id,
      name: 'Treadmill Run',
      category: 'cardio',
      muscleGroup: 'full_body',
      equipment: 'treadmill',
      description: 'Steady-state aerobic cardio session.',
    },
  });

  const bobBench = await prisma.exercise.create({
    data: {
      userId: bob.id,
      name: 'Bench Press',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'barbell',
      description:
        'Classic upper-body push movement for chest, shoulders, and triceps.',
    },
  });

  const bobRow = await prisma.exercise.create({
    data: {
      userId: bob.id,
      name: 'Dumbbell Row',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'dumbbells',
      description:
        'Unilateral pulling movement targeting the lats and rhomboids.',
    },
  });

  const charliePullup = await prisma.exercise.create({
    data: {
      userId: charlie.id,
      name: 'Pull-Up',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'pull-up bar',
      description: 'Bodyweight vertical pull targeting lats and biceps.',
    },
  });

  const charlieCycle = await prisma.exercise.create({
    data: {
      userId: charlie.id,
      name: 'Stationary Bike',
      category: 'cardio',
      muscleGroup: 'legs',
      equipment: 'stationary bike',
      description: 'Low-impact cardio option for endurance and recovery.',
    },
  });

  // WorkoutSessions with nested Workout entries
  // Alice – session 1
  await prisma.workoutSession.create({
    data: {
      userId: alice.id,
      title: 'Monday Leg Day',
      notes: 'Focus on depth and controlled descent.',
      workoutDate: '2025-04-21',
      durationMinutes: 60,
      workouts: {
        create: [
          {
            exerciseId: aliceSquat.id,
            sets: 4,
            reps: 8,
            weight: 135,
            durationSeconds: 0,
            notes: 'Felt solid — increase weight next session.',
          },
        ],
      },
    },
  });

  // Alice – session 2
  await prisma.workoutSession.create({
    data: {
      userId: alice.id,
      title: 'Wednesday Cardio',
      workoutDate: '2025-04-23',
      durationMinutes: 30,
      workouts: {
        create: [
          {
            exerciseId: aliceRun.id,
            sets: 1,
            reps: 1,
            weight: 0,
            durationSeconds: 1800,
          },
        ],
      },
    },
  });

  // Bob – session 1
  await prisma.workoutSession.create({
    data: {
      userId: bob.id,
      title: 'Chest & Back Day',
      notes: 'Superset bench and rows.',
      workoutDate: '2025-04-22',
      durationMinutes: 50,
      workouts: {
        create: [
          {
            exerciseId: bobBench.id,
            sets: 5,
            reps: 5,
            weight: 185,
            durationSeconds: 0,
          },
          {
            exerciseId: bobRow.id,
            sets: 4,
            reps: 10,
            weight: 60,
            durationSeconds: 0,
          },
        ],
      },
    },
  });

  // Charlie – session 1
  await prisma.workoutSession.create({
    data: {
      userId: charlie.id,
      title: 'Full Body Friday',
      workoutDate: '2025-04-25',
      durationMinutes: 45,
      workouts: {
        create: [
          {
            exerciseId: charliePullup.id,
            sets: 3,
            reps: 10,
            weight: 0,
            durationSeconds: 0,
            notes: 'Add weight next week.',
          },
          {
            exerciseId: charlieCycle.id,
            sets: 1,
            reps: 1,
            weight: 0,
            durationSeconds: 1200,
          },
        ],
      },
    },
  });

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
