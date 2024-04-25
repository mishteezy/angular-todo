import { FormControl } from '@angular/forms';

export type Task = {
  date: number;
  title: string;
  name: string;
  priority: string;
  status: string;
  users: string[];
  guid: string;
  deadline: string;
};

export type TaskForm = {
  title: FormControl<string | null>;
  name: FormControl<string | null>;
  priority: FormControl<string | null>;
  deadline: FormControl<string | null>;
  users: FormControl<string[] | null>;
};

export type TaskEditForm = {
  status: FormControl<string | null>;
  users: FormControl<string[] | null>;
};

export type FilterForm = {
  status?: FormControl<string>;
  user?: FormControl<string>;
  deadline?: FormControl<string>;
};
