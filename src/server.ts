import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import config from './ormconfig';
import CompanyController from './company/controller';
import CloudProviderController from './cloudProvider/controller';
import ExecutiveController from './executive/controller';
import ExecutiveTypeController from './executiveType/controller';
import validateEnvironmentVariables from './utils/validateEnvironmentVariables';
 
validateEnvironmentVariables();

(async () => {
  
  //Connect to the database using typeorm
  try {
    await createConnection(config);
  } catch (error) {
    console.log('Create connection error', error);
    return error;
  }

  //Create the app 
  const app = new App(
    [
      new CompanyController(),
      new CloudProviderController(),
      new ExecutiveController(),
      new ExecutiveTypeController(),
    ]
  );
   
  app.listen();
})();