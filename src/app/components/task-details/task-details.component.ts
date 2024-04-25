import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { TaskService } from 'src/app/services/task.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { PriorityMapper } from 'src/app/constants/mappers';
import { STATUS_OPTIONS } from 'src/app/constants/options';
import { Task, TaskEditForm } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  private readonly id = this.route.snapshot.params['id'];

  editForm = this.fb.group<TaskEditForm>({
    status: this.fb.control('', Validators.required),
    users: this.fb.control([], Validators.required),
  });

  task: Task;

  subscriptions: Subscription[] = [];

  readonly statusOptions = STATUS_OPTIONS;

  readonly users = this.userService.getList();

  readonly priorityMapper = PriorityMapper;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const sub = this.taskService
      .getDetail(this.id)
      .pipe(
        tap((task) => {
          this.task = task;
          this.editForm.patchValue({ status: task.status, users: task.users });
        }),
        switchMap(() =>
          this.editForm.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
              console.log(this.editForm.valid);
              return this.editForm.valid
                ? this.taskService.updateTask(this.id, {
                    ...this.task,
                    ...value,
                  })
                : of(0);
            })
          )
        )
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
