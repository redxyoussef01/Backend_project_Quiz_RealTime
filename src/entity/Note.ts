import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Quiz } from "./Quiz";
import { User } from "./User";

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.id)
  quiz: Quiz;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
