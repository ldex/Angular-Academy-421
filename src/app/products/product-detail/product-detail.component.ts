import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  imports: [UpperCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {

  private productService = inject(ProductService)
  private titleService = inject(Title)

  @Input() product: Product

  @Input() set id(productId) {
    this
      .productService
      .getProductById(productId)
      .subscribe(
        result => {
          this.product = result
          this.titleService.setTitle('Details for : ' + this.product.name)
        }
      )
  }

}
