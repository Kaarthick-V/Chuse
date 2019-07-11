import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from 'src/app/services/payment.service';
import { ActivatePayment } from 'src/app/shared/models/activatePayment.model';

@Component({
    selector:"",
    templateUrl:"activate-payment-window.component.html",
    styleUrls:["activate-payment-window.component.css"]
})
export class ActivatePaymentWindowComponent{
    public paymentDetails:ActivatePayment[];
    constructor(public dialogRef:MatDialogRef<ActivatePaymentWindowComponent>,private paymentService:PaymentService){}
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        
        this.paymentService.getActivatePayment().subscribe((data)=>{
            this.paymentDetails=data;
            debugger;
        });
    }
    onNoClick():void{
        this.dialogRef.close();
    }

    
}