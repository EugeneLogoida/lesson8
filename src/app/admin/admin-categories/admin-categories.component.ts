import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { deleteObject, getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { ICategoriesResponse } from 'src/app/shared/interfaces/categories/categories.interface';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  public isUploaded = false;
  public addStatus = false;
  public editStatus = false;
  public adminCategories: Array<ICategoriesResponse> = [];
  public categoriesForm!:FormGroup;

  public categoryId!:number;



  constructor(
    private fb:FormBuilder,
    private categoriesService: CategoriesService,
    private storage: Storage
    ) { }

  ngOnInit(): void {
    this.initCategoriesForm();
    this.loadCategories()
  }

  initCategoriesForm():void{
    this.categoriesForm = this.fb.group({
      // name: [null, Validators.required],
      // path: [null, Validators.required],
      // imagePath: [null, Validators.required]
      name: [null],
      path: [null],
      imagePath: [null]
    })
  }

  createCategory():void{
    
    this.addStatus = true

  }

  addCategory():void{

    if(this.editStatus){
      this.categoriesService.update(this.categoriesForm.value, this.categoryId).subscribe(() => 
        this.loadCategories()
      )
    }else{
      this.categoriesService.create(this.categoriesForm.value).subscribe(() =>
        this.loadCategories() 
      )
    }


    this.categoriesForm.reset();
    this.addStatus = false;
    
    this.isUploaded = false;
    this.editStatus = false;

  }

  editCategory(category:ICategoriesResponse):void{
    this.categoriesForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    })
    this.isUploaded = true;
    this.addStatus = true;
    this.editStatus = true;
    this.categoryId = category.id;

  }
  deleteCategory(category:ICategoriesResponse):void{
    this.categoriesService.delete(category.id).subscribe(()=>
      this.loadCategories()
    )
    
  }

  loadCategories(): void{
    this.categoriesService.getAll().subscribe(data=>
      this.adminCategories = data)
  }





  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images/categories', file.name, file)
      .then(data => {
        this.categoriesForm.patchValue({
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
    return this.categoriesForm.get(control)?.value;
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.categoriesForm.patchValue({
        imagePath: null
      })
    })
  }

}
