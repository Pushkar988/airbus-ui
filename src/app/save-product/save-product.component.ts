import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from '../model/Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.css'],
})
export class SaveProductComponent implements OnInit {
  form: FormGroup;
  mode;
  productId;
  isLoading;
  product: any;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      category: new FormControl(null, { validators: [Validators.required] }),
      units: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.productId = paramMap.get('id');
        this.isLoading = true;
        this.productService
          .getproductByProductId(this.productId)
          .subscribe((res) => {
            this.isLoading = false;
            this.product = res;
            this.form.setValue({
              name: this.product.name,
              category: this.product.category,
              description: this.product.description,
              units: this.product.units,
            });
          });
      } else {
        this.mode = 'create';
        this.productId = null;
      }
    });
  }

  onSaveProduct() {
    if (this.form.invalid) {
      debugger;
      return;
    }
    debugger;
    this.isLoading = true;
    if (this.mode === 'create') {
      this.productService
        .saveProduct({
          id: this.productId,
          name: this.form.value.name,
          category: this.form.value.category,
          description: this.form.value.description,
          units: this.form.value.units,
        })
        .subscribe((res) => {
          this.router.navigate(['/']);
        });
    } else {
      this.productService
        .saveProduct({
          id: this.productId,
          name: this.form.value.name,
          category: this.form.value.category,
          description: this.form.value.description,
          units: this.form.value.units,
        })
        .subscribe((res) => {
          this.router.navigate(['/']);
        });
    }
    this.form.reset();
  }
}
