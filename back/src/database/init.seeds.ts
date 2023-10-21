import { runSeeders } from 'typeorm-extension';
import { AppDataSource } from '../data-source';


AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.synchronize(true);
    await runSeeders(AppDataSource);
    process.exit();
  })
  .catch(console.error);
