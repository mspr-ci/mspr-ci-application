import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrder } from 'app/shared/model/order.model';
import { OrderService } from './order.service';
import { OrderDeleteDialogComponent } from './order-delete-dialog.component';

@Component({
  selector: 'jhi-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit, OnDestroy {
  orders?: IOrder[];
  eventSubscriber?: Subscription;

  constructor(protected orderService: OrderService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.orderService.query().subscribe((res: HttpResponse<IOrder[]>) => (this.orders = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOrders();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOrder): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOrders(): void {
    this.eventSubscriber = this.eventManager.subscribe('orderListModification', () => this.loadAll());
  }

  delete(order: IOrder): void {
    const modalRef = this.modalService.open(OrderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.order = order;
  }
}
