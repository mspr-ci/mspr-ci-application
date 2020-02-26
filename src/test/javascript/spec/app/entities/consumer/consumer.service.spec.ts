import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ConsumerService } from 'app/entities/consumer/consumer.service';
import { IConsumer, Consumer } from 'app/shared/model/consumer.model';

describe('Service Tests', () => {
  describe('Consumer Service', () => {
    let injector: TestBed;
    let service: ConsumerService;
    let httpMock: HttpTestingController;
    let elemDefault: IConsumer;
    let expectedResult: IConsumer | IConsumer[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ConsumerService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Consumer(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateOfBirth: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Consumer', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateOfBirth: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOfBirth: currentDate
          },
          returnedFromService
        );

        service.create(new Consumer()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Consumer', () => {
        const returnedFromService = Object.assign(
          {
            firstname: 'BBBBBB',
            lastname: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            dateOfBirth: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOfBirth: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Consumer', () => {
        const returnedFromService = Object.assign(
          {
            firstname: 'BBBBBB',
            lastname: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            dateOfBirth: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOfBirth: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Consumer', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
