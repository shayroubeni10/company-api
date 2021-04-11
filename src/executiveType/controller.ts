import * as express from 'express';
import { getRepository } from 'typeorm';
import ExecutiveTypeNotFoundException from '../exceptions/ExecutiveTypeNotFoundException';
import Controller from '../interfaces/controller';
import validationMiddleware from '../middlewares/validation';
import ExecutiveTypeDto from './dto';
import ExecutiveType from './entity';

class ExecutiveTypeController implements Controller {
  public path = '/executiveTypes';
  public router = express.Router();
  private executiveTypeRepository = getRepository(ExecutiveType);

 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.get(this.path, this.getAllExecutiveTypes);
    this.router.get(`${this.path}/:id`, this.getExecutiveTypeById);
    this.router.post(this.path, validationMiddleware(ExecutiveTypeDto), this.createExecutiveType);
    this.router.patch(`${this.path}/:id`, validationMiddleware(ExecutiveTypeDto, true), this.modifyExecutiveType);
    this.router.delete(`${this.path}/:id`, this.deleteExecutiveType);
  }
 
  private getAllExecutiveTypes = async (request: express.Request, response: express.Response) => {
    const executiveTypes = await this.executiveTypeRepository.find();
    response.send(executiveTypes);
  }
 
  private getExecutiveTypeById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const executiveType = await this.executiveTypeRepository.findOne(id);
    
    if (executiveType) {
      response.send(executiveType);
    } else {
      next(new ExecutiveTypeNotFoundException(id));
    }
  }

  private createExecutiveType = async (request: express.Request, response: express.Response) => {
    const executiveTypeData: ExecutiveTypeDto = request.body;
    const newExecutiveType = this.executiveTypeRepository.create(executiveTypeData);
    await this.executiveTypeRepository.save(newExecutiveType);
    response.send(newExecutiveType);
  }
   
  private modifyExecutiveType = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const executiveTypeData: ExecutiveType = request.body;
    
    await this.executiveTypeRepository.update(id, executiveTypeData);
    const updatedExecutiveType = await this.executiveTypeRepository.findOne(id);

    if (updatedExecutiveType) {
      response.send(updatedExecutiveType);
    } else {
      next(new ExecutiveTypeNotFoundException(id));
    }
  }
   
  private deleteExecutiveType = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const deleteResponse = await this.executiveTypeRepository.delete(id);

    if (deleteResponse.affected == 1) {
      response.send(200);
    } else {
      next(new ExecutiveTypeNotFoundException(id));
    }
  }
}
 
export default ExecutiveTypeController;