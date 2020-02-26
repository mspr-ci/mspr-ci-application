import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsumer } from 'app/shared/model/consumer.model';
import { ConsumerService } from './consumer.service';
import { ConsumerDeleteDialogComponent } from './consumer-delete-dialog.component';

@Component({
  selector: 'jhi-consumer',
  templateUrl: './consumer.component.html'
})
export class ConsumerComponent implements OnInit, OnDestroy {
  consumers?: IConsumer[];
  eventSubscriber?: Subscription;

  constructor(protected consumerService: ConsumerService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.consumerService.query().subscribe((res: HttpResponse<IConsumer[]>) => (this.consumers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInConsumers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IConsumer): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInConsumers(): void {
    this.eventSubscriber = this.eventManager.subscribe('consumerListModification', () => this.loadAll());
  }

  delete(consumer: IConsumer): void {
    const modalRef = this.modalService.open(ConsumerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.consumer = consumer;
  }
}
