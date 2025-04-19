import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { auth } from './lib/auth';

dotenv.config();

const app = express();
const port = 8000;

// Enable CORS for your frontend
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.all('/api/auth/*', toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});
