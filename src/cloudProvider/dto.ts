import { IsString } from 'class-validator';
 
class CloudProviderDto {
  @IsString()
  public name: string;
 
}
 
export default CloudProviderDto;