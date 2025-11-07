import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import getEnvVar from './utils/getEnvVars.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import router from './routers/index.js';

const PORT = Number(getEnvVar("PORT") || 8080);

export default function setupServer() {
    const app = express();

    app.use(express.json());

    app.use(cors());

    const logger = pino({
        transport: {
            target: "pino-pretty",
            options: { colorize: true },
        }
    });

    app.use(pinoHttp({ logger }));

    app.use('/api', router);

    app.use(notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, (error) => {
        if (error) {
            throw error;
        }

        console.log(`Server is running on port ${PORT}`);
    });
};
