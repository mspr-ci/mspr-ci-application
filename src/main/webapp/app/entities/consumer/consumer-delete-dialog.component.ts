import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsumer } from 'app/shared/model/consumer.model';
import { ConsumerService } from './consumer.service';

@Component({
  templateUrl: './consumer-delete-dialog.component.html'
})
export class ConsumerDeleteDialogComponent {
  consumer?: IConsumer;

  constructor(protected consumerService: ConsumerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.consumerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('consumerListModification');
      this.activeModal.close();
    });
  }
}
