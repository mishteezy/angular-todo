import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from './components/menu/menu.module';
import { CreateTaskModule } from './components/create-task/create-task.module';
import { TaskListModule } from './components/task-list/task-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenuModule,
    CreateTaskModule,
    TaskListModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
