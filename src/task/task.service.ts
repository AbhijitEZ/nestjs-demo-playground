import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTask(): Promise<Array<Task>> {
    return this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('Task not found');
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTask(updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { id, title, description, status } = updateTaskDto;
    const task = await this.getTaskById(id);
    task.title = title;
    task.status = status;
    task.description = description;
    await task.save();
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    this.taskRepository.delete(id);
  }
}
