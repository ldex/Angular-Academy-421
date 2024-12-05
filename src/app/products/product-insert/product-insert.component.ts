import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

interface ProductForm {
  name: FormControl<string>;
  price: FormControl<number>;
  description: FormControl<string>;
  imageUrl: FormControl<string>;
  discontinued: FormControl<boolean>;
  fixedPrice: FormControl<boolean>;
  modifiedDate: FormControl<Date>;
}

@Component({
  selector: 'app-product-insert',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './product-insert.component.html',
  styleUrl: './product-insert.component.scss'
})
export class ProductInsertComponent {

  insertForm: FormGroup<ProductForm>;
  private productService = inject(ProductService)
  private router = inject(Router)

  get name() { return this.insertForm.get('name'); }
  get price() { return this.insertForm.get('price'); }
  get description() { return this.insertForm.get('description'); }
  get imageUrl() { return this.insertForm.get('imageUrl'); }

  constructor(private fb: FormBuilder) {
    const validImgUrlRegex: RegExp = new RegExp('^(https?://[a-zA-Z0-9-.]+.[a-zA-Z]{2,5}(?:/S*)?(?:[-A-Za-z0-9+&@#/%?=~_|!:,.;])+.(?:jpg|jpeg|gif|png))$');

    this.insertForm = this.fb.group(
      {
        name:['', [Validators.required, Validators.maxLength(50)]],
        price: [null as number, [Validators.required, Validators.min(0), Validators.max(10000000)]],
        description: ['', [Validators.minLength(5), Validators.maxLength(100)]],
        imageUrl: ['', [Validators.pattern(validImgUrlRegex)]],
        discontinued: [false],
        fixedPrice: [false],
        modifiedDate: [null]
      }
    );
  }

  onSubmit() {
    let newProduct: Partial<Product> = this.insertForm.getRawValue()

    this
      .productService
      .insertProduct(newProduct)
      .subscribe(
        {
          next: product => {
            console.log('Product saved on the server with id: ' + product.id)
            this.productService.resetList()
            this.router.navigateByUrl('/products')
          },
          error: e => {
            console.error('Could not save product! ' + e.message)
          }
        }
      )

  }

}
