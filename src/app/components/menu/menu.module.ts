import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MenuComponent } from './menu.component';

@NgModule({
  imports: [CommonModule, MatToolbarModule, RouterModule],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})
export class MenuModule {}
