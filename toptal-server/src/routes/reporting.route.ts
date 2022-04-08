import { Router } from 'express';
import ReportingController from '@controllers/reporting.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';

class ReportingRoute implements Routes {
  public path = '/reporting';
  public router = Router();
  public reportingController = new ReportingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/food-entries`, authMiddleware, this.reportingController.foodEntries);
  }
}

export default ReportingRoute;
