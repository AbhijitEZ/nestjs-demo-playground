import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus, Task } from '../task.entity';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(bodyData: Task): Task {
    const { status } = bodyData;
    if (!this.isStatusValid(status)) {
      throw new BadRequestException(`${status} is not valid status`);
    }
    return bodyData;
  }

  private isStatusValid(status): boolean {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
