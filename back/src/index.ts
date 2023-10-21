import { useExpressServer } from 'routing-controllers';
import express from 'express';
import { AppDataSource } from './data-source';
import { UserController } from './controllers/UserController';
import cors from 'cors';
import path from 'path';
import { authorizationChecker } from './auth/authChecker';
import { currentUserChecker } from './auth/currentUserChecker';

import { runSeeders } from 'typeorm-extension';
import { EstablishmentController } from './controllers/EnstablishmentController';
import { ImageController } from './controllers/ImageController';
import { ReviewController } from './controllers/ReviewController';

const app = express();
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

// Логирование входящих запросов
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

AppDataSource.initialize().then(async () => {
  await AppDataSource.synchronize(true);
  await runSeeders(AppDataSource);

  useExpressServer(app, {
    classTransformer: true,
    validation: true,
    controllers: [EstablishmentController, ImageController,ReviewController, UserController],
    authorizationChecker: authorizationChecker,
    currentUserChecker: currentUserChecker,
  });

 

  // Обработчик ошибок, добавил статус ошибки для отладки
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(`Error encountered: ${err.message}`);
    return res.status(500).json({ error: err.message });
  });
  app.all('*', (req, res) => {
    if (!res.headersSent) {
      res.status(404).json({ message: 'Route Not Found' });
    }
  });
  app.listen(3006, () => {
    console.log('Server is running on port 3006');
  });
});

