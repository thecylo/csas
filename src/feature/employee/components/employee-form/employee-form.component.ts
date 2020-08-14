import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Employee } from 'src/shared/models/employee-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departments } from 'src/shared/enums/departments';

@Component({
  selector: 'app-employee-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  readonly departments = Departments;
  @Input() set employee(emp: Employee) {
    if (emp) {
      this.employeeForm.setValue(emp);
    }
  }
  @Input() btnMsg: string;
  @Input() view: boolean;

  @Output() formValues = new EventEmitter<Employee>();

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      id: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [
        null,
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')],
      ],
      department: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.view) {
      this.employeeForm.disable();
    }
  }

  submitForm(): void {
    if (this.employeeForm.valid) {
      this.formValues.emit(this.employeeForm.value);
    }
  }
}
