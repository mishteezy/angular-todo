import { ChangeDetectionStrategy, Component } from '@angular/core';

import { STATUS_OPTIONS } from 'src/app/constants/options';
import { UserDataService } from 'src/app/services/user-data.service';

import { FilterFormService } from '../../services/filter-form.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'task-list-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  readonly users = this.userService.getList();

  readonly statusOptions = STATUS_OPTIONS;

  readonly deadlineOptions = this.taskService.getDeadlineList();

  get filterForm() {
    return this.filterService.form;
  }

  constructor(
    private userService: UserDataService,
    private filterService: FilterFormService,
    private taskService: TaskService
  ) {}
}
