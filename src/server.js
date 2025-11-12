import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import getEnvVar from './utils/getEnvVars.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import router from './routers/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import cookieParser from 'cookie-parser';

const PORT = Number(getEnvVar('PORT') || 8080);

export default function setupServer() {
  const app = express();

  app.use('/api-docs', swaggerDocs());
  app.use(express.json());

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );

  app.use(cookieParser());

  const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  });

  app.use(pinoHttp({ logger }));

  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Api is running' });
  });

  app.use('/api', router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Server is running on port ${PORT}`);
  });
}
