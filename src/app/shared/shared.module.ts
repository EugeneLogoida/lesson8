import { NgModule } from '@angular/core'

import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


const MATERIAL = [
    MatDialogModule,
    MatInputModule,
    MatButtonModule
]

@NgModule({
    declarations:[],
    imports:[
        ...MATERIAL
    ],
    exports:[
        ...MATERIAL
    ]
})
export class SharedModule {  }