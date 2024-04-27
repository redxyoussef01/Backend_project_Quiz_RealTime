import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Question } from "./Question"
import { User } from "./User"
@Entity()
export class Quiz {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    makerId: number

    @Column()
    userId: number

    @Column()
    description: string

    @Column()
    temps: number

    @Column()
    note: number

    @ManyToMany(() => Question)
    @JoinTable()
    questions: Question[];
    
    @ManyToMany(() => User)
    @JoinTable()
    taker: User[];
}
