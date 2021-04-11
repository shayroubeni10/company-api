import * as express from 'express';
import * as bodyParser from 'body-parser';
import Controller from './interfaces/controller';
import errorMiddleware from './middlewares/error';

 
class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: Controller[]) {
    this.app = express();
 
    this.initMiddlewares();
    this.initControllers(controllers);
  }
 
  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private initMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(errorMiddleware);
  }

  private initControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}
 
export default App;