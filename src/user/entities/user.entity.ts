import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  seq: number;

  @Column()
  userName: string;

  @Column({unique: true})
  userId: string;

  @Column()
  password: string;

  @Column()
  role: string;

}