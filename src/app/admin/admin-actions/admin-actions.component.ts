import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActionsResponse } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';

import { deleteObject, getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.scss']
})
export class AdminActionsComponent implements OnInit {

  public adminActions: Array<IActionsResponse> = [];
  public addStatus = false;
  public actionsForm!: FormGroup;
  public isUploaded = false;
  public actionsId!:number;
  public editStatus = false;

  public d = new Date();
  

  constructor(
    private actionsService: ActionsService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.loadActions();
    this.initActionsForm()
  }
  initActionsForm(): void {
    this.actionsForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  loadActions():void{
    this.actionsService.getAll().subscribe(data=>
      this.adminActions = data
    )
  }

  createAction():void{

    this.addStatus = true
  }
  addAction():void{

    if(this.editStatus){
      this.actionsService.update(this.actionsForm.value, this.actionsId).subscribe(() => {
        this.loadActions();
      })
    } else {
      this.actionsService.create(this.actionsForm.value).subscribe(() =>
      this.loadActions() 
      )
    }
    
    this.actionsForm.reset();
    this.addStatus = false;
    
    this.isUploaded = false;
    this.editStatus = false;
  }

  editAction(discount: IActionsResponse):void{
    this.actionsForm.patchValue({
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath
    })
    console.log(this.actionsForm.value);
    
    this.isUploaded = true;
    this.addStatus = true;
    this.editStatus = true;
    this.actionsId = discount.id;
    

  }
  deleteAction(discount:IActionsResponse): void{
    
    this.actionsService.delete(discount.id).subscribe(() => {
      this.loadActions();
    })

  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images/actions', file.name, file)
      .then(data => {
        this.actionsForm.patchValue({
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
    return this.actionsForm.get(control)?.value;
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.actionsForm.patchValue({
        imagePath: null
      })
    })
  }
}
