import { useExpressServer } from 'routing-controllers';
import express from 'express';
import { AppDataSource } from './data-source';
import { UserController } from './controllers/UserController';
import cors from 'cors';
import path from 'path';
import { authorizationChecker } from './auth/authChecker';
import { currentUserChecker } from './auth/currentUserChecker';
import { CocktailController } from './controllers/СocktailController';
import { IngredientController } from './controllers/IngredientController';
import { RatingController } from './controllers/RatingController';
import { runSeeders } from 'typeorm-extension';

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
    controllers: [CocktailController, IngredientController,RatingController, UserController],
    authorizationChecker: authorizationChecker,
    currentUserChecker: currentUserChecker,
  });

  app.use(express.json());

  // Обработчик ошибок, добавил статус ошибки для отладки
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(`Error encountered: ${err.message}`);
    res.status(500).json({ error: err.message });
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

