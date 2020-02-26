import { Moment } from 'moment';

export interface IConsumer {
  id?: number;
  firstname?: string;
  lastname?: string;
  phoneNumber?: string;
  dateOfBirth?: Moment;
}

export class Consumer implements IConsumer {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public phoneNumber?: string,
    public dateOfBirth?: Moment
  ) {}
}
