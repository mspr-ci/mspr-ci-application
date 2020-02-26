import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsumer } from 'app/shared/model/consumer.model';

@Component({
  selector: 'jhi-consumer-detail',
  templateUrl: './consumer-detail.component.html'
})
export class ConsumerDetailComponent implements OnInit {
  consumer: IConsumer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consumer }) => (this.consumer = consumer));
  }

  previousState(): void {
    window.history.back();
  }
}
