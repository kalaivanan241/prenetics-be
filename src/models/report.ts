import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./user";
import * as yup from "yup";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  policyNumber!: string;

  @Column("simple-json")
  report!: { data: any };

  @Column({ nullable: true })
  userId!: number;
  @ManyToOne((_type) => User, (user: User) => user.reports)
  @JoinColumn()
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export const ReportSchema = yup.object().shape({
  policyNumber: yup.string().required().min(3),
  report: yup.object(),
});
