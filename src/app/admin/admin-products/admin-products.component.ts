import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductsResponse } from 'src/app/shared/interfaces/products/products.interface';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

import { ICategoriesResponse } from 'src/app/shared/interfaces/categories/categories.interface';

import { deleteObject, getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  public isUploaded = false;
  public addStatus = false;
  public editStatus = false;
  public adminCategories: Array<ICategoriesResponse> = [];
  public adminProducts: Array<IProductsResponse> = [];
  
  public productForm!:FormGroup;

  public productId!:number;

  constructor(
    private fb:FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private storage: Storage
  ) { }


  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProduct();
  }
  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      ingredients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    });
  }

  loadProduct(): void {
    this.productsService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }

  loadCategories(): void {
    this.categoriesService.getAll().subscribe(data => {
      this.adminCategories = data;
      this.productForm.patchValue({
        category: this.adminCategories[0]
      })
    })
  }



  createProduct():void{
    this.addStatus = true;
    
  }
  editProduct(product:IProductsResponse){
    
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      weight: product.weight,
      ingredients: product.ingredients,
      price: product.price,
      imagePath: product.imagePath
    });
    console.log(this.productForm.value.category);
    this.isUploaded = true;
    this.editStatus = true;
    
    this.addStatus = true;
    this.productId = product.id;
  } 
  deleteProduct(product:IProductsResponse){
    this.productsService.delete(product.id).subscribe(() => {
      this.loadProduct();
    })
  }


  addProduct(): void {
    if(this.editStatus){
      this.productsService.update(this.productForm.value, this.productId).subscribe(() => {
        this.loadProduct();
      })
    } else {
      this.productsService.create(this.productForm.value).subscribe(() =>
      this.loadProduct() 
      )
      
    }
    
    this.productForm.reset();
    this.addStatus = false;
    
    this.isUploaded = false;
    this.editStatus = false;
  }






  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images/products', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }
  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if(file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.productForm.patchValue({
        imagePath: null
      })
    })
  }

}
