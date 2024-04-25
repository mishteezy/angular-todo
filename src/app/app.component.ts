import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'task-tracker';

  constructor(private userService: UserDataService) {}

  ngOnInit(): void {
    this.userService.setUsers();
  }
}
