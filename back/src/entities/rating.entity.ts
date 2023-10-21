import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Cocktail } from './cocktail.entity';


  @Entity()
  export class Rating {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.ratings, { onDelete: 'CASCADE' })
    user!: User;

    @ManyToOne(() => Cocktail, (cocktail) => cocktail.ratings, { onDelete: 'CASCADE' })
    cocktail!: Cocktail;

    @Column()
    rating!: number;


  }