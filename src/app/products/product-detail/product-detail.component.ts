import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [UpperCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {

  @Input() product: Product

}
