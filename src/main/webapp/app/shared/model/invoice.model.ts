import { Moment } from 'moment';

export interface IInvoice {
  id?: number;
  enterprise?: string;
  price?: number;
  vat?: number;
  date?: Moment;
}

export class Invoice implements IInvoice {
  constructor(public id?: number, public enterprise?: string, public price?: number, public vat?: number, public date?: Moment) {}
}
