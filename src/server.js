import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import goalRoutes from './routes/goalRoutes.js';
import authRoutes from './routes/authRoutes.js';
import workoutSessionRoutes from './routes/workoutSessionRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
if (process.env !== 'test') app.use(morgan('tiny'));

//load openapi specification file
let specs;
try {
  specs = yaml.load(fs.readFileSync('./docs/openapi.yaml', 'utf8'));
} catch (error) {
  //log error and stop the server
  console.log('Failed to load OpenAPI specification', error);
  process.exit(1);
}

//mount swaggerui endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

//API Routes
app.use('/api/goals', goalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/workout-session', workoutSessionRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/workouts', workoutRoutes);

//404 Not Found middleware
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  console.log(err.message);
  next(err);
});

//global error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;
