import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'users',
})
export class UsersPipe implements PipeTransform {
  transform(users: string[]): string {
    return users.join(', ');
  }
}
