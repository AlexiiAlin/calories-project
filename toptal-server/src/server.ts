process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import ReportingRoute from '@routes/reporting.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import FoodEntryRoute from '@routes/food-entry.route';

validateEnv();

const app = new App([new ReportingRoute(), new UsersRoute(), new AuthRoute(), new FoodEntryRoute()]);

app.listen();
