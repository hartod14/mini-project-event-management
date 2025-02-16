import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Application,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { authRouter } from './routers/auth.router';
import { panelEventRouter } from './routers/panel/event.router';
import { eventRouter } from './routers/event.router';
import { reviewRouter } from './routers/review.router';
import { cityRouter } from './routers/city.router';
import { categoryRouter } from './routers/category.router';
import { uploadImageRouter } from './routers/uploadImage.router';
import { authorizeOrganizer, verifyUser } from './middalewares/auth.middleware';
import { ErrorHandler } from './helpers/response.handler';

export default class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(express.json());
    this.app.use(cors());
    // this.app.use(urlencoded({ extended: true }));
  }

  private handleError() {
    //not found handler
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send("Not found !");
    });

    //error handler
    this.app.use(
      (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
        res.status(err.code || 500).send({
          message: err.message,
        });
      }
    );
  }

  private routes(): void {
    this.app.get('/api', (req: Request, res: Response) => {
      // res.send(`Hello, Purwadhika Student API!`);
      res.send(console.log(process.env.DATABASE_URL));
    });

    this.app.use('/api/reviews', reviewRouter());
    this.app.use('/api/events', eventRouter());
    this.app.use('/api/booking', authRouter());

    //global
    this.app.use('/api/auth', authRouter());
    this.app.use('/api/cities', cityRouter());
    this.app.use('/api/categories', categoryRouter());
    this.app.use('/api/upload-image', uploadImageRouter())

    //panel
    this.app.use('/api/panel/events', verifyUser, authorizeOrganizer, panelEventRouter());

    // this.app.use('/api/image', panelEventRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
