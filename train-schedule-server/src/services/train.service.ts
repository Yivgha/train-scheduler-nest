import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Train } from 'src/entities/train.entity';
import { CreateTrainDto, UpdateTrainDto } from 'src/dto/train.dto';

@Injectable()
export class TrainService {
  constructor(
    @InjectRepository(Train)
    private trainRepository: Repository<Train>,
  ) {}

  async findAll(): Promise<Train[]> {
    const trains = await this.trainRepository.find();
    if (!trains) {
      throw new NotFoundException('Trains not found');
    }
    return trains;
  }

  async findOne(id: number): Promise<Train> {
    const train = await this.trainRepository.findOne({
      where: { id },
    });

    if (!train) {
      throw new NotFoundException(`Train with ID ${id} not found`);
    }
    return train;
  }

  async create(createTrainDto: CreateTrainDto): Promise<Train> {
    const train = this.trainRepository.create(createTrainDto);
    return await this.trainRepository.save(train);
  }

  async update(id: number, updateTrainDto: UpdateTrainDto): Promise<Train> {
    console.log('Updating train with ID:', id);
    const train = await this.trainRepository.preload({
      id,
      ...updateTrainDto,
    });

    if (!train) {
      throw new NotFoundException(`Train with ID ${id} not found`);
    }

    return await this.trainRepository.save(train);
  }

  async remove(id: number): Promise<void> {
    const train = await this.findOne(id);
    await this.trainRepository.remove(train);
  }
}
