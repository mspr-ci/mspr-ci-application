import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.MsprCiApplicationOrderModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.MsprCiApplicationInvoiceModule)
      },
      {
        path: 'consumer',
        loadChildren: () => import('./consumer/consumer.module').then(m => m.MsprCiApplicationConsumerModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MsprCiApplicationEntityModule {}
