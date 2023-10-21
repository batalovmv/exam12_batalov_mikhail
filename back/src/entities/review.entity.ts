import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Establishment } from './establishment.entity';
import { User } from './user.entity';


@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  qualityRating!: number;

  @Column()
  serviceRating!: number;

  @Column()
  environmentRating!: number;

  @Column()
  comment!: string;

  @ManyToOne(type => User, user => user.reviews)
  user!: User;

  @ManyToOne(type => Establishment, establishment => establishment.reviews)
  establishment!: Establishment;
}