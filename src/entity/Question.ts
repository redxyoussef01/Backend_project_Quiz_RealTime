import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Quiz } from "./Quiz";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qst: string;

  @Column()
  option1: string;

  @Column()
  option2: string;

  @Column()
  option3: string;

  @Column()
  option4: string;

  @Column()
  answeris: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;
}
