import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateFoodEntryDto {
  @IsString()
  public userId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  calories: number;

  @IsString()
  foodName: string;

  @IsDateString()
  date: Date;
}

export class UpdateFoodEntryDto extends CreateFoodEntryDto {
  @IsNumber()
  public id: number;
}
