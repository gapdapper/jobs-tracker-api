import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors'; 

// extra security packages
import helmet from 'helmet'
import cors from 'cors'
import xss from 'xss-clean'
import rateLimiter from 'express-rate-limit'


import express from 'express';
const app = express();


// connectDB
import {connectDB} from './db/connect.js';

import {authenticationCheck} from './middleware/authentication.js'

// routers
import authRouter from './routes/auth.js';
import jobsRouter from './routes/jobs.js';



// error handler
import {notFoundMiddleware} from './middleware/not-found.js';
import {errorHandlerMiddleware} from './middleware/error-handler.js';



// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Powered-By'],
};


// security packages
app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 100
}))
app.use(express.json());
app.use(helmet())
app.use(cors(corsOptions))
app.use(xss())


app.get('/', (req,res) => {
  res.send('jobs api')
})


// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticationCheck, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
