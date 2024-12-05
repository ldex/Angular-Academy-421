import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-product-detail',
  imports: [UpperCasePipe, CurrencyPipe, DatePipe, MaterialModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {

  private productService = inject(ProductService)
  private titleService = inject(Title)
  private router = inject(Router)
  private dialog = inject(MatDialog)

  @ViewChild('dialog') dialogTemplate: TemplateRef<any>

  confirmDeleteProduct() {
    let dialogRef = this.dialog.open(this.dialogTemplate);
    dialogRef.afterClosed().subscribe(deleteConfirmed => {
      if (deleteConfirmed) {
        this.deleteProduct();
      }
    });
  }

  deleteProduct() {
    this
      .productService
      .deleteProduct(this.product.id)
      .subscribe(
        {
          next: () => {
            console.log('Product deleted')
            this.productService.resetList()
            this.router.navigateByUrl('/products')
          },
          error: e => {
            console.error('Could not delete product: ' + e.message)
          }
        }
      )
  }

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
