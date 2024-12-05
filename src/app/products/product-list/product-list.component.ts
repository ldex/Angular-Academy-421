import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Product } from '../../models/product.interface'
import { AsyncPipe, CurrencyPipe, UpperCasePipe } from '@angular/common'
import { ProductDetailComponent } from '../product-detail/product-detail.component'
import { ProductService } from '../../services/product.service'
import { Observable, Subscription } from 'rxjs'
import { MaterialModule } from '../../material.module'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-product-list',
  imports: [MaterialModule, TranslatePipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements AfterViewInit, OnDestroy, OnInit {
  title: string = 'Products'
  selectedProduct: Product
  private productService = inject(ProductService)
  products$: Observable<Product[]> = this.productService.products$.pipe()

  onSelect(product: Product) {
    this.selectedProduct = product
  }

  displayedColumns = ['id', 'name', 'description', 'price'];
  dataSource: MatTableDataSource<Product>;
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  sub: Subscription = new Subscription()

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  ngOnInit(): void {
  }

  constructor() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.dataSource = new MatTableDataSource();
    this.isLoading = true;
    this
      .products$
      .pipe(takeUntilDestroyed())
      .subscribe((products) => {
      this.dataSource.data = products;
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
