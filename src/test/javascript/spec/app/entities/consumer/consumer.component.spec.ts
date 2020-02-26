import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MsprCiApplicationTestModule } from '../../../test.module';
import { ConsumerComponent } from 'app/entities/consumer/consumer.component';
import { ConsumerService } from 'app/entities/consumer/consumer.service';
import { Consumer } from 'app/shared/model/consumer.model';

describe('Component Tests', () => {
  describe('Consumer Management Component', () => {
    let comp: ConsumerComponent;
    let fixture: ComponentFixture<ConsumerComponent>;
    let service: ConsumerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MsprCiApplicationTestModule],
        declarations: [ConsumerComponent]
      })
        .overrideTemplate(ConsumerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsumerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsumerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Consumer(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.consumers && comp.consumers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
