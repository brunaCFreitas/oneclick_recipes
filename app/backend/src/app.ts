import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import mealsRouter from './routes/meals.routes';
import drinksRouter from './routes/drinks.routes';
import recipesRouter from './routes/recipes.routes';
import errorHandler from './middlewares/errorHandler';
import userRouter from './routes/user.routes';

import * as swaggerJSON from './swagger.json';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/meals', mealsRouter);
    this.app.use('/drinks', drinksRouter);
    this.app.use('/recipes', recipesRouter);
    this.app.use('/users', userRouter);

    this.app.use(errorHandler);
  }

  private config():void {
    this.app.get('/swagger.json', (_req, res) => { res.json(swaggerJSON); });
    this.app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: '/swagger.json',
        },
      }),
    );
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
