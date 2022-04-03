import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { FoodEntries } from '@interfaces/foodEntries.interface';
import { UserEntity } from '@entity/users.entity';

@Entity('foodEntries')
export class FoodEntriesEntity implements FoodEntries {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  userId: string;

  @Column()
  price: number;

  @Column()
  calories: number;

  @Column()
  foodName: string;

  @Column()
  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => UserEntity, user => user.foodEntries)
  user: UserEntity;
}
