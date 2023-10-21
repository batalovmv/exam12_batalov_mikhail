import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rating } from "./rating.entity";
import { Ingredient } from "./ingredient.entity";
import { User } from "./user.entity";

@Entity()
export class Cocktail {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.cocktails)
  user!: User;

  @Column()
  title!: string;

  @Column({ default: 'default-image.jpg' })
  image!: string;

  @Column()
  recipe!: string;

  @Column()
  isPublished!: boolean;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.cocktail, { onDelete: 'CASCADE' })
  ingredients!: Ingredient[];

  @OneToMany(() => Rating, (rating) => rating.cocktail, { onDelete: 'CASCADE' })
  ratings!: Rating[];

  
}