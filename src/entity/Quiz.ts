import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Question } from "./Question";


@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  makerId: number;

  @Column()
  description: string;

  @Column()
  temps: number;

  @Column()
  note: number;

  @ManyToMany(() => Question) // Set eager option to true
  @JoinTable()
  questions: Question[];
}
