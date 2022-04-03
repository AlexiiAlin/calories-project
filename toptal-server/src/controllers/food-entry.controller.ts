import { NextFunction, Request, Response } from 'express';
import FoodEntryService from '@services/food-entry.service';
import { FoodEntries } from '@interfaces/foodEntries.interface';
import { CreateFoodEntryDto, UpdateFoodEntryDto } from '@dtos/foodEntries.dto';

class FoodEntryController {
  public foodEntryService = new FoodEntryService();

  public getFoodEntries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.query.userId;
      const foodEntries = await this.foodEntryService.findFoodEntries(userId as string);
      res.status(200).json(foodEntries);
    } catch (error) {
      next(error);
    }
  };

  public getFoodEntryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const foodEntryId = req.params.id;
      const foodEntry = await this.foodEntryService.findFoodEntryById(foodEntryId);
      res.status(200).json(foodEntry);
    } catch (error) {
      next(error);
    }
  };

  public addFoodEntry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const foodEntryData: CreateFoodEntryDto = req.body;
      const foodEntry: FoodEntries = await this.foodEntryService.addFood(foodEntryData);

      res.status(201).json(foodEntry);
    } catch (error) {
      next(error);
    }
  };

  public updateFoodEntry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const foodEntryId = req.params.id;
      const updateFoodEntryData: UpdateFoodEntryDto = req.body;
      const updateFoodEntry: FoodEntries = await this.foodEntryService.updateFoodEntry(foodEntryId, updateFoodEntryData);

      res.status(200).json(updateFoodEntry);
    } catch (error) {
      next(error);
    }
  };

  public deleteFoodEntry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const foodEntryId = req.params.id;
      await this.foodEntryService.deleteFood(foodEntryId);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default FoodEntryController;
