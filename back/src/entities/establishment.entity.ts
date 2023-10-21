import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { Review } from './review.entity';
import { Image } from './image.entity';


@Entity()
export class Establishment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToOne(type => User, user => user.establishments)
  user!: User;

  @OneToMany(type => Review, review => review.establishment)
  reviews!: Review[];

  @OneToMany(type => Image, image => image.establishment)
  images!: Image[];
}