import { IsString, IsDateString } from 'class-validator';

export class CreateTrainDto {
  @IsString()
  name: string;

  @IsString()
  fromDestination: string;

  @IsString()
  toDestination: string;

  @IsDateString()
  date: string;
}

export class UpdateTrainDto {
  @IsString()
  name?: string;

  @IsString()
  fromDestination?: string;

  @IsString()
  toDestination?: string;

  @IsDateString()
  date?: string;
}
