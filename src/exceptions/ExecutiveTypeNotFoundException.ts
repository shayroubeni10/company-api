import HttpException from "./HttpException";
 
class ExecutiveTypeNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Executive Type with id ${id} not found`);
  }
}
 
export default ExecutiveTypeNotFoundException;