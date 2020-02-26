import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MsprCiApplicationTestModule } from '../../../test.module';
import { OrderComponent } from 'app/entities/order/order.component';
import { OrderService } from 'app/entities/order/order.service';
import { Order } from 'app/shared/model/order.model';

describe('Component Tests', () => {
  describe('Order Management Component', () => {
    let comp: OrderComponent;
    let fixture: ComponentFixture<OrderComponent>;
    let service: OrderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MsprCiApplicationTestModule],
        declarations: [OrderComponent]
      })
        .overrideTemplate(OrderComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Order(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.orders && comp.orders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
