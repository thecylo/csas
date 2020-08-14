import { Departments } from '../enums/departments';

export class Employee {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public department: Departments,
    public email: string
  ) {}
}
