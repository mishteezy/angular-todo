import { Injectable } from '@angular/core';

import { BehaviorSubject, delay, finalize, map, of, tap } from 'rxjs';

import { Guid } from 'guid-typescript';

import { TaskStatus } from '../core/enums/task-status';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  loading$ = new BehaviorSubject(false);

  getList(filters: { status?: string; user?: string; deadline?: string }) {
    return of(JSON.parse(localStorage.getItem('taskList') || '[]')).pipe(
      delay(500),
      map((tasks: Task[]) =>
        tasks.filter((task) => {
          return filters.user
            ? task.status.includes(filters.status || '') &&
                task.deadline.includes(filters.deadline || '') &&
                task.users.includes(filters.user || '')
            : task.status.includes(filters.status || '') &&
                task.deadline.includes(filters.deadline || '');
        })
      )
    );
  }

  getDeadlineList() {
    return of(JSON.parse(localStorage.getItem('taskList') || '[]')).pipe(
      delay(500),
      map((tasks: Task[]) =>
        [...new Set(tasks.map((task) => task.deadline))].sort(
          (a, b) => new Date(a).getDate() - new Date(b).getDate()
        )
      )
    );
  }

  getDetail(id: string) {
    return of(JSON.parse(localStorage.getItem('taskList') || '[]')).pipe(
      map((tasks: Task[]) => tasks.find((task) => task.guid === id))
    );
  }

  createTask(task: Task) {
    this.loading$.next(true);
    return of(0).pipe(
      delay(1000),
      tap(() => {
        const list = JSON.parse(localStorage.getItem('taskList') || '[]');
        const guid = Guid.create().toString();
        localStorage.setItem(
          'taskList',
          JSON.stringify([...list, { ...task, guid, status: TaskStatus.NEXT }])
        );
      }),
      finalize(() => {
        this.loading$.next(false);
      })
    );
  }

  updateTask(guid: string, task: Task) {
    return of(0).pipe(
      tap(() => {
        const list = JSON.parse(
          localStorage.getItem('taskList') || '[]'
        ) as Task[];
        const index = list.findIndex((task) => task.guid === guid);
        list[index] = task;
        localStorage.setItem('taskList', JSON.stringify(list));
      })
    );
  }
}
