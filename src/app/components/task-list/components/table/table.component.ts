import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Task } from 'src/app/models/task.model';
import {
  PriorityMapper,
  StatusMapper,
  TableHeaderMapper,
} from 'src/app/constants/mappers';

import { COLUMNS } from './columns';

@Component({
  selector: 'task-list-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  readonly columns = COLUMNS;

  readonly statusMapper = StatusMapper;
  readonly priorityMapper = PriorityMapper;
  readonly tableHeaderMapper = TableHeaderMapper;

  @Input() dataSource: MatTableDataSource<Task>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router) {}

  navigate(task: Task) {
    console.log(this.dataSource);
    this.router.navigate([`details/${task.guid}`]);
  }
}
