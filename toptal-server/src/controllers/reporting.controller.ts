import { NextFunction, Request, Response } from 'express';
import FoodEntryService from '@services/food-entry.service';

class ReportingController {
  public foodEntryService = new FoodEntryService();

  public foodEntries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.foodEntryService.foodEntriesReporting();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default ReportingController;
