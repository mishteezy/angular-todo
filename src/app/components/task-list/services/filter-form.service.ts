import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilterForm } from 'src/app/models/task.model';

@Injectable()
export class FilterFormService {
  form = this.fb.group<FilterForm>({
    status: this.fb.control('', { nonNullable: true }),
    user: this.fb.control('', { nonNullable: true }),
    deadline: this.fb.control('', { nonNullable: true }),
  });

  constructor(private fb: FormBuilder) {}
}
