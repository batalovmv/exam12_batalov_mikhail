import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Cocktail } from './cocktail.entity';


@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cocktail, (cocktail) => cocktail.ingredients, { onDelete: 'CASCADE' })
  cocktail!: Cocktail;

  @Column()
  ingredientName!: string;

  @Column()
  ingredientQuantity!: string;

}