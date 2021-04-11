import * as express from 'express';
import { getRepository } from 'typeorm';
import CompanyNotFoundException from '../exceptions/CompanyNotFoundException';
import Controller from '../interfaces/controller';
import validationMiddleware from '../middlewares/validation';
import CompanyDto from './dto';
import Company from './entity';

class CompanyController implements Controller {
  public path = '/companies';
  public router = express.Router();
  private companyRepository = getRepository(Company);

 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.get(this.path, this.getAllCompanies);
    this.router.get(`${this.path}/:id`, this.getCompanyById);
    this.router.post(this.path, validationMiddleware(CompanyDto), this.createCompany);
    this.router.patch(`${this.path}/:id`, validationMiddleware(CompanyDto, true), this.modifyCompany);
    this.router.delete(`${this.path}/:id`, this.deleteCompany);
  }
 
  private getAllCompanies = async (request: express.Request, response: express.Response) => {
    const companies = await this.companyRepository.find();
    response.send(companies);
  }
 
  private getCompanyById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const company = await this.companyRepository.findOne(id);
    
    if (company) {
      response.send(company);
    } else {
      next(new CompanyNotFoundException(id));
    }
  }

  private createCompany = async (request: express.Request, response: express.Response) => {
    const companyData: CompanyDto = request.body;
    const newCompany = this.companyRepository.create(companyData);
    await this.companyRepository.save(newCompany);
    response.send(newCompany);
  }
   
  private modifyCompany = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const companyData: Company = request.body;
    
    await this.companyRepository.update(id, companyData);
    const updatedCompany = await this.companyRepository.findOne(id);

    if (updatedCompany) {
      response.send(updatedCompany);
    } else {
      next(new CompanyNotFoundException(id));
    }
  }
   
  private deleteCompany = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const deleteResponse = await this.companyRepository.delete(id);
    if (deleteResponse.affected == 1) {
      response.send(200);
    } else {
      next(new CompanyNotFoundException(id));
    }
  }
}
 
export default CompanyController;