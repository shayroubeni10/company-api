import { cleanEnv, str, port} from 'envalid';
   
  function validateEnvironmentVariables() {
    cleanEnv(process.env, {
      POSTGRES_HOST: str(),
      POSTGRES_USER: str(),
      POSTGRES_PASSWORD: str(),
      POSTGRES_DB: str(),
      POSTGRES_PORT: port(),
    });
  }

export default validateEnvironmentVariables;