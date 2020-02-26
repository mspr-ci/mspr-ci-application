import { Moment } from 'moment';

export interface IOrder {
  id?: number;
  productName?: string;
  quantity?: number;
  price?: number;
  buyerName?: string;
  date?: Moment;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public productName?: string,
    public quantity?: number,
    public price?: number,
    public buyerName?: string,
    public date?: Moment
  ) {}
}
