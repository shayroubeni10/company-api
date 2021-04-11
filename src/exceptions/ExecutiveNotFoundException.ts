import HttpException from "./HttpException";
 
class ExecutiveNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Executive with id ${id} not found`);
  }
}
 
export default ExecutiveNotFoundException;