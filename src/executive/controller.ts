import * as express from 'express';
import { getRepository } from 'typeorm';
import ExecutiveNotFoundException from '../exceptions/ExecutiveNotFoundException';
import Controller from '../interfaces/controller';
import validationMiddleware from '../middlewares/validation';
import ExecutiveDto from './dto';
import Executive from './entity';

class ExecutiveController implements Controller {
  public path = '/executives';
  public router = express.Router();
  private executiveRepository = getRepository(Executive);

 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.get(this.path, this.getAllExecutives);
    this.router.get(`${this.path}/:id`, this.getExecutiveById);
    this.router.post(this.path, validationMiddleware(ExecutiveDto), this.createExecutive);
    this.router.patch(`${this.path}/:id`, validationMiddleware(ExecutiveDto, true), this.modifyExecutive);
    this.router.delete(`${this.path}/:id`, this.deleteExecutive);
  }
 
  private getAllExecutives = async (request: express.Request, response: express.Response) => {
    const executives = await this.executiveRepository.find({ relations: ['company']});
    response.send(executives);
  }
 
  private getExecutiveById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const executive = await this.executiveRepository.findOne(id, { relations: ['company']});
    
    if (executive) {
      response.send(executive);
    } else {
      next(new ExecutiveNotFoundException(id));
    }
  }

  private createExecutive = async (request: express.Request, response: express.Response) => {
    const executiveData: ExecutiveDto = request.body;
    const newExecutive = this.executiveRepository.create(executiveData);
    await this.executiveRepository.save(newExecutive);
    response.send(newExecutive);
  }
   
  private modifyExecutive = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const executiveData: Executive = request.body;
    
    await this.executiveRepository.update(id, executiveData);
    const updatedExecutive = await this.executiveRepository.findOne(id);

    if (updatedExecutive) {
      response.send(updatedExecutive);
    } else {
      next(new ExecutiveNotFoundException(id));
    }
  }
   
  private deleteExecutive = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const deleteResponse = await this.executiveRepository.delete(id);

    if (deleteResponse.affected == 1) {
      response.send(200);
    } else {
      next(new ExecutiveNotFoundException(id));
    }
  }
}
 
export default ExecutiveController;