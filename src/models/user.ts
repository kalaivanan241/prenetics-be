import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";

import { Report } from "./report";
import * as yup from "yup";
import bcrypt from "bcrypt";

@Entity()
export class User {
  public static hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
  };

  public static comparePassword = async (
    user: User,
    password: string
  ): Promise<boolean> => {
    const result = await bcrypt.compare(password, user.password);
    return result;
  };

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  dateOfBirth!: Date;

  @OneToMany((_type) => Report, (policy: Report) => policy.user)
  reports!: Array<Report>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    this.password = await User.hashPassword(this.password);
  }
}

export const signUpSchema = yup.object().shape({
  firstName: yup.string().required().min(3),
  lastName: yup.string(),
  email: yup.string().email().required(),
  dateOfBirth: yup.string().required(),
  password: yup.string().required(),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
