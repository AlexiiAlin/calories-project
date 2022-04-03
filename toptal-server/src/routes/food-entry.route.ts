import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import FoodEntryController from '@controllers/food-entry.controller';
import { CreateFoodEntryDto, UpdateFoodEntryDto } from '@dtos/foodEntries.dto';

class FoodEntryRoute implements Routes {
  public path = '/food-entries';
  public router = Router();
  public foodEntryController = new FoodEntryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.foodEntryController.getFoodEntries);
    this.router.get(`${this.path}/:id(\\d+)`, this.foodEntryController.getFoodEntryById);
    this.router.post(`${this.path}`, validationMiddleware(CreateFoodEntryDto, 'body', true), this.foodEntryController.addFoodEntry);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(UpdateFoodEntryDto, 'body', true), this.foodEntryController.updateFoodEntry);
    this.router.delete(`${this.path}/:id(\\d+)`, this.foodEntryController.deleteFoodEntry);
  }
}

export default FoodEntryRoute;
