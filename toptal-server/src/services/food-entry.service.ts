import { getRepository } from 'typeorm';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { FoodEntries } from '@interfaces/foodEntries.interface';
import { CreateFoodEntryDto, UpdateFoodEntryDto } from '@dtos/foodEntries.dto';
import { FoodEntriesEntity } from '@entity/foodEntries.entity';
import moment from 'moment';

class FoodEntryService {
  public foodEntries = FoodEntriesEntity;

  public findFoodEntries(userId: string): Promise<FoodEntries[]> {
    const foodEntriesRepository = getRepository(this.foodEntries);
    const whereClause = userId ? { where: { userId } } : {};
    return foodEntriesRepository.find({
      relations: ['user'],
      order: { date: 'DESC' },
      ...whereClause,
    });
  }

  public findFoodEntryById(foodEntryId): Promise<FoodEntries> {
    const foodEntriesRepository = getRepository(this.foodEntries);
    return foodEntriesRepository.findOne({
      where: { id: foodEntryId },
      relations: ['user'],
    });
  }

  public async addFood(foodEntryData: CreateFoodEntryDto): Promise<FoodEntries> {
    if (isEmpty(foodEntryData)) throw new HttpException(400, 'Incorrect food entry');

    const foodEntriesRepository = getRepository(this.foodEntries);
    return await foodEntriesRepository.save(foodEntryData);
  }

  public async updateFoodEntry(foodEntryId, foodEntryData: UpdateFoodEntryDto): Promise<FoodEntries> {
    if (isEmpty(foodEntryData)) throw new HttpException(400, 'Incorrect food entry');

    const foodEntriesRepository = getRepository(this.foodEntries);
    const findFE: FoodEntries = await foodEntriesRepository.findOne({
      where: {
        id: foodEntryId,
      },
    });
    if (!findFE) throw new HttpException(409, 'Food entry that needs to be updated does not exist');

    await foodEntriesRepository.update(foodEntryId, foodEntryData);

    return foodEntriesRepository.findOne({
      where: {
        id: foodEntryId,
      },
    });
  }

  public async deleteFood(foodEntryId): Promise<any> {
    if (isEmpty(foodEntryId)) throw new HttpException(400, 'No food entry given');
    const foodEntriesRepository = getRepository(this.foodEntries);
    return await foodEntriesRepository.delete({ id: foodEntryId });
  }

  public async foodEntriesReporting(): Promise<any> {
    const foodEntriesRepository = getRepository(this.foodEntries);
    const foodEntries = await foodEntriesRepository.find();
    const now = moment().endOf('day');
    const date7DaysAgo = moment().subtract(7, 'd').startOf('day');
    const date14DaysGo = moment().subtract(14, 'd').startOf('day');
    return {
      '7-days': foodEntries.filter(foodEntry => {
        return moment(foodEntry.date).isBetween(date7DaysAgo, now);
      }).length,
      '14-days': foodEntries.filter(foodEntry => {
        return moment(foodEntry.date).isBetween(date14DaysGo, date7DaysAgo);
      }).length,
    };
  }
}

export default FoodEntryService;
