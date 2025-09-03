import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Emailotp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  otp: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
  
  @Column()
  activeStatus: number;
  
}
