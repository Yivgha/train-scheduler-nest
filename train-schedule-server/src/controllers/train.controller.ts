import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TrainService } from 'src/services/train.service';
import { CreateTrainDto, UpdateTrainDto } from 'src/dto/train.dto';

@Controller('trains')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Get()
  findAll() {
    return this.trainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.trainService.findOne(id);
  }

  @Post()
  create(@Body() createTrainDto: CreateTrainDto) {
    return this.trainService.create(createTrainDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTrainDto: UpdateTrainDto) {
    return this.trainService.update(id, updateTrainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.trainService.remove(id);
  }
}
