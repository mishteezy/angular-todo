import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription, startWith, tap } from 'rxjs';

import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { FilterFormService } from './services/filter-form.service';

import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [FilterFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Task>;

  subscriptions: Subscription[] = [];

  @ViewChild(TableComponent) table: TableComponent;

  get filterForm() {
    return this.filterService.form;
  }

  constructor(
    private taskService: TaskService,
    private filterService: FilterFormService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const sub = this.filterForm.valueChanges
      .pipe(
        startWith({
          status: '',
          user: '',
          deadline: '',
        }),
        tap((filters) => {
          this.taskService.getList(filters).subscribe((tasks) => {
            this.dataSource = new MatTableDataSource(tasks);
            this.dataSource.sort = this.table.sort;

            this.cd.markForCheck();
          });
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
