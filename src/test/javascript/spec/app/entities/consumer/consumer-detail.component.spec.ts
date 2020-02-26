import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MsprCiApplicationTestModule } from '../../../test.module';
import { ConsumerDetailComponent } from 'app/entities/consumer/consumer-detail.component';
import { Consumer } from 'app/shared/model/consumer.model';

describe('Component Tests', () => {
  describe('Consumer Management Detail Component', () => {
    let comp: ConsumerDetailComponent;
    let fixture: ComponentFixture<ConsumerDetailComponent>;
    const route = ({ data: of({ consumer: new Consumer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MsprCiApplicationTestModule],
        declarations: [ConsumerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ConsumerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConsumerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load consumer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.consumer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
