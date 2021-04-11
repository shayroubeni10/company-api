import HttpException from "./HttpException";
 
class CloudProviderNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Cloud Provider with id ${id} not found`);
  }
}
 
export default CloudProviderNotFoundException;