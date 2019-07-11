import { NgModule } from "@angular/core";
import {
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDividerModule,
} from '@angular/material';


@NgModule({
    imports: [
        MatCheckboxModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatChipsModule,
        MatDividerModule
    ],
    exports:[
        MatCheckboxModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatChipsModule,
        MatDividerModule
    ]
})
export class MaterialModule {

}