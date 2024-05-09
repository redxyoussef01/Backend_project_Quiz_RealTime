import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Account } from "./Account";
import { JoinColumn } from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => Account, { eager: true })
  @JoinColumn()
  account: Account;
}
