import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Establishment } from './establishment.entity';


@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @ManyToOne(type => User, user => user.images)
  user!: User;

  @ManyToOne(type => Establishment, establishment => establishment.images)
  establishment!: Establishment;
}