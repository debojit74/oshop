import { Product } from './../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = { $key: "", title: "", price: null, imageUrl: "", category: "" };
  id;
  buttonsClicked = false;

  @ViewChild('f') public ProductForm: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll(); 
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe((p: Product) => this.product = p);
  }

  canDeactivate(): boolean {
    if (this.ProductForm.dirty && !this.buttonsClicked)
      return confirm('Any changes made will not be saved. Are you Sure ?');
    return true;
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.buttonsClicked = true;
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.buttonsClicked = true;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
