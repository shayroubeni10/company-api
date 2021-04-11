import * as express from 'express';
import { getRepository } from 'typeorm';
import CloudProviderNotFoundException from '../exceptions/CloudProviderNotFoundException';
import Controller from '../interfaces/controller';
import validationMiddleware from '../middlewares/validation';
import CloudProviderDto from './dto';
import CloudProvider from './entity';

class CloudProviderController implements Controller {
  public path = '/cloudProviders';
  public router = express.Router();
  private cloudProviderRepository = getRepository(CloudProvider);

 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.get(this.path, this.getAllCloudProviders);
    this.router.get(`${this.path}/:id`, this.getCloudProviderById);
    this.router.post(this.path, validationMiddleware(CloudProviderDto), this.createCloudProvider);
    this.router.patch(`${this.path}/:id`, validationMiddleware(CloudProviderDto, true), this.modifyCloudProvider);
    this.router.delete(`${this.path}/:id`, this.deleteCloudProvider);
  }
 
  private getAllCloudProviders = async (request: express.Request, response: express.Response) => {
    const cloudProviders = await this.cloudProviderRepository.find();
    response.send(cloudProviders);
  }
 
  private getCloudProviderById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const cloudProvider = await this.cloudProviderRepository.findOne(id);
    
    if (cloudProvider) {
      response.send(cloudProvider);
    } else {
      next(new CloudProviderNotFoundException(id));
    }
  }

  private createCloudProvider = async (request: express.Request, response: express.Response) => {
    const cloudProviderData: CloudProviderDto = request.body;
    const newCloudProvider = this.cloudProviderRepository.create(cloudProviderData);
    await this.cloudProviderRepository.save(newCloudProvider);
    response.send(newCloudProvider);
  }
   
  private modifyCloudProvider = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const cloudProviderData: CloudProvider = request.body;
    
    await this.cloudProviderRepository.update(id, cloudProviderData);
    const updatedCloudProvider = await this.cloudProviderRepository.findOne(id);

    if (updatedCloudProvider) {
      response.send(updatedCloudProvider);
    } else {
      next(new CloudProviderNotFoundException(id));
    }
  }
   
  private deleteCloudProvider = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const deleteResponse = await this.cloudProviderRepository.delete(id);

    if (deleteResponse.affected == 1) {
      response.send(200);
    } else {
      next(new CloudProviderNotFoundException(id));
    }
  }
}
 
export default CloudProviderController;