import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { ProductService } from '../product.service';

import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'descriptions',
    'units',
    'Edit',
  ];
  dataSource;
  mySet = new Set();
  cat = 'All';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.mySet.add('All');
    this.productService.getproduct().subscribe((result) => {
      this.products = result;
      this.products.forEach((element) => {
        this.mySet.add(element.category);
      });
      this.dataSource = new MatTableDataSource(this.products);
    });
  }

  searchByName(name: any) {
    if (!name || name === '') {
      if (this.cat === 'All') {
        this.productService.getproduct().subscribe((result) => {
          this.products = result;
          this.products.forEach((element) => {
            this.mySet.add(element.category);
          });
          this.dataSource = new MatTableDataSource(this.products);
        });
      } else {
        this.productService
          .getproductByCategory(this.cat)
          .subscribe((result) => {
            this.products = result;
            this.products.forEach((element) => {
              this.mySet.add(element.category);
            });
            this.dataSource = new MatTableDataSource(this.products);
          });
      }
    } else if (name && name != '') {
      const products = this.products.filter(function (product) {
        return (
          product.name.toLowerCase().includes(name.toLowerCase()) ||
          product.description.toLowerCase().includes(name.toLowerCase()) ||
          product.category.toLowerCase().includes(name.toLowerCase())
        );
      });
      // this.products = products;
      this.dataSource = new MatTableDataSource(products);
    }
  }

  getByCategory(event) {
    if (event && event.value && event.value == 'All') {
      this.cat = event.value;
      this.productService.getproduct().subscribe((result) => {
        this.products = result;
        this.products.forEach((element) => {
          this.mySet.add(element.category);
        });
        this.dataSource = new MatTableDataSource(this.products);
      });
    } else if (event && event.value) {
      this.cat = event.value;
      this.productService
        .getproductByCategory(event?.value)
        .subscribe((result) => {
          this.products = result;
          this.products.forEach((element) => {
            this.mySet.add(element.category);
          });
          this.dataSource = new MatTableDataSource(this.products);
        });
    }
  }
}
