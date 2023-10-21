import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Establishment } from "./establishment.entity";
import { Review } from "./review.entity";
import { Image } from "./image.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;
  @Column()
  token!: string;

  @Column()
  role!: string;

  @OneToMany(type => Establishment, establishment => establishment.user)
  establishments!: Establishment[];

  @OneToMany(type => Review, review => review.user)
  reviews!: Review[];

  @OneToMany(type => Image, image => image.user)
  images!: Image[];
}