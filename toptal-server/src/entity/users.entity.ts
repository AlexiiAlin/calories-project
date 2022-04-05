import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { User } from '@interfaces/users.interface';
import { FoodEntriesEntity } from '@entity/foodEntries.entity';

@Entity('users')
@Unique(['email'])
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({
    default: 1,
  })
  userType: number;

  @Column({
    default: 2100,
  })
  caloriesLimit: number;

  @Column({
    default: 1000,
  })
  monthlyLimit: number;

  @OneToMany(() => FoodEntriesEntity, foodEntry => foodEntry.user)
  foodEntries: FoodEntriesEntity[];
}
