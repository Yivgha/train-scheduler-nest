export class CreateTrainDto {
  name: string;
  fromDestination: string;
  toDestination: string;
  date: string;
}

export class UpdateTrainDto {
  name?: string;
  fromDestination?: string;
  toDestination?: string;
  date?: string;
}
