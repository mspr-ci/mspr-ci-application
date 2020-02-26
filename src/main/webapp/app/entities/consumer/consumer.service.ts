import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConsumer } from 'app/shared/model/consumer.model';

type EntityResponseType = HttpResponse<IConsumer>;
type EntityArrayResponseType = HttpResponse<IConsumer[]>;

@Injectable({ providedIn: 'root' })
export class ConsumerService {
  public resourceUrl = SERVER_API_URL + 'api/consumers';

  constructor(protected http: HttpClient) {}

  create(consumer: IConsumer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consumer);
    return this.http
      .post<IConsumer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(consumer: IConsumer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consumer);
    return this.http
      .put<IConsumer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConsumer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConsumer[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(consumer: IConsumer): IConsumer {
    const copy: IConsumer = Object.assign({}, consumer, {
      dateOfBirth: consumer.dateOfBirth && consumer.dateOfBirth.isValid() ? consumer.dateOfBirth.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateOfBirth = res.body.dateOfBirth ? moment(res.body.dateOfBirth) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((consumer: IConsumer) => {
        consumer.dateOfBirth = consumer.dateOfBirth ? moment(consumer.dateOfBirth) : undefined;
      });
    }
    return res;
  }
}
