import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MsprCiApplicationTestModule } from '../../../test.module';
import { ConsumerUpdateComponent } from 'app/entities/consumer/consumer-update.component';
import { ConsumerService } from 'app/entities/consumer/consumer.service';
import { Consumer } from 'app/shared/model/consumer.model';

describe('Component Tests', () => {
  describe('Consumer Management Update Component', () => {
    let comp: ConsumerUpdateComponent;
    let fixture: ComponentFixture<ConsumerUpdateComponent>;
    let service: ConsumerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MsprCiApplicationTestModule],
        declarations: [ConsumerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ConsumerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsumerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsumerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Consumer(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Consumer();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
