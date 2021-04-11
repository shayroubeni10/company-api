import { IsString } from 'class-validator';
 
class CompanyDto {
  @IsString()
  public name: string;

  @IsString()
  public website: string;
}
 
export default CompanyDto;