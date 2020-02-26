import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IConsumer, Consumer } from 'app/shared/model/consumer.model';
import { ConsumerService } from './consumer.service';
import { ConsumerComponent } from './consumer.component';
import { ConsumerDetailComponent } from './consumer-detail.component';
import { ConsumerUpdateComponent } from './consumer-update.component';

@Injectable({ providedIn: 'root' })
export class ConsumerResolve implements Resolve<IConsumer> {
  constructor(private service: ConsumerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsumer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((consumer: HttpResponse<Consumer>) => {
          if (consumer.body) {
            return of(consumer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Consumer());
  }
}

export const consumerRoute: Routes = [
  {
    path: '',
    component: ConsumerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Consumers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConsumerDetailComponent,
    resolve: {
      consumer: ConsumerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Consumers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConsumerUpdateComponent,
    resolve: {
      consumer: ConsumerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Consumers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConsumerUpdateComponent,
    resolve: {
      consumer: ConsumerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Consumers'
    },
    canActivate: [UserRouteAccessService]
  }
];
