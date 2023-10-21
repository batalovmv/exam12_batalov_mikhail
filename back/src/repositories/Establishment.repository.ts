
import { AppDataSource } from '../data-source';
import { Establishment } from '../entities/establishment.entity';


export const EstablishmentRepository = AppDataSource.getRepository(Establishment);