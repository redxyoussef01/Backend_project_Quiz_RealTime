import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Double, OneToOne, JoinColumn } from "typeorm"
import { Quiz } from "./Quiz"
import { User } from "./User"
@Entity()
export class Note {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    note: string

    @OneToOne(() => Quiz, { onDelete: "CASCADE" })
    @JoinColumn()
    quiz: Quiz;
    
    @OneToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn()
    user: User;
}
