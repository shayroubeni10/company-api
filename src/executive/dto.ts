import { IsString } from 'class-validator';
 
class ExecutiveDto {
  @IsString()
  public name: string;

  @IsString()
  public email: string;
 
}
 
export default ExecutiveDto;