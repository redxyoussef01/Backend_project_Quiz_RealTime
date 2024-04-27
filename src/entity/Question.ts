import { Entity, PrimaryGeneratedColumn, Column,BaseEntity, ManyToMany, JoinTable } from "typeorm"
import { Quiz } from "./Quiz"
@Entity()
export class Question  {
    [x: string]: any

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    qst: string

    @Column()
    option1: string

    @Column()
    option2: string

    @Column()
    option3: string

    @Column()
    option4: string

    @Column()
    answeris: string
/*
    @ManyToMany( () => Quiz )
    @JoinTable()
    quizzes: Quiz[];
*/
}
