import { IsString } from 'class-validator';
 
class ExecutiveTypeDto {
  @IsString()
  public name: string;
 
}
 
export default ExecutiveTypeDto;