import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () =>
      import('./components/task-list/task-list.module').then(
        (m) => m.TaskListModule
      ),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./components/create-task/create-task.module').then(
        (m) => m.CreateTaskModule
      ),
  },
  {
    path: 'details/:id',
    loadChildren: () =>
      import('./components/task-details/task-details.module').then(
        (m) => m.TaskDetailsModule
      ),
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
