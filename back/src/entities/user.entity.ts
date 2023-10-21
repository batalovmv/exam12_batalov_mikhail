import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rating } from "./rating.entity";
import { Cocktail } from "./cocktail.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  displayName!: string;

  @Column()
  email!: string;

  @Column({ default: 'default_avatar.png' })
  avatar!: string;

  @Column()
  password!: string;

  @Column()
  token!: string;

  @Column()
  role!: 'user' | 'admin';

  @OneToMany(() => Cocktail, (cocktail) => cocktail.user)
  cocktails!: Cocktail[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings!: Rating[];
}