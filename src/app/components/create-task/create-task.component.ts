import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NativeDateAdapter } from '@angular/material/core';

import { TaskService } from 'src/app/services/task.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { PRIORITY_OPTIONS } from 'src/app/constants/options';
import { Task, TaskForm } from 'src/app/models/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  providers: [NativeDateAdapter],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent implements OnDestroy {
  form = this.fb.group<TaskForm>({
    title: this.fb.control('', Validators.required),
    name: this.fb.control('', Validators.required),
    priority: this.fb.control('normal', Validators.required),
    deadline: this.fb.control('', Validators.required),
    users: this.fb.control([], Validators.required),
  });

  minDate = new Date();

  subscriptions: Subscription[] = [];

  readonly loading$ = this.taskService.loading$;

  readonly users = this.userService.getList();

  readonly priorityOptions = PRIORITY_OPTIONS;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserDataService
  ) {}

  submit() {
    if (this.form.invalid) return;
    const sub = this.taskService
      .createTask(this.form.value as Task)
      .subscribe(() => {
        this.router.navigateByUrl('/list');
      });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
