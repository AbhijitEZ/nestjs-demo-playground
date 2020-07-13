import { IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;
}

export class UpdateTaskDto {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  status: TaskStatus;
}
