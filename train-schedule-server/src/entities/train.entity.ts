import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Train {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fromDestination: string;

  @Column()
  toDestination: string;

  @Column('timestamp')
  date: string;
}
