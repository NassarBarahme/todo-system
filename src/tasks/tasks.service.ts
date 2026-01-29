import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    const Task = await this.taskModel.findById(id).exec();
    if (!Task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return Task;
  }
  async update(id: string, updateData: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }
  async delete(id: string): Promise<{ message: string }> {
    const task = await this.taskModel.findByIdAndDelete(id).exec();

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return { message: 'Task deleted successfully' };
  }
}
