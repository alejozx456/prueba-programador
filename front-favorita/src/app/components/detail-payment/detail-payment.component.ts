import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PagopluxResponse } from '../../models/pagoplux-response.interface';


@Component({
  selector: 'app-detail-payment',
  imports: [CommonModule,MatCardModule,MatProgressSpinnerModule],
  templateUrl: './detail-payment.component.html',
  styleUrl: './detail-payment.component.scss'
})
export class DetailPaymentComponent {

  //dialogRef=MatDialogRef<DetailPaymentComponent>
  data=inject(MAT_DIALOG_DATA);
  api=inject(AuthService);
  pagoPluxResponse!:PagopluxResponse;

constructor(public dialogRef:MatDialogRef<DetailPaymentComponent>){

}

ngOnInit(){
  console.log(this.data)
}

ngAfterViewInit(){
  this.getPagoPluxResponse();
}

getPagoPluxResponse(){
  this.api.getPagoPluxResponse(this.data).subscribe((response:PagopluxResponse)=>{
    this.pagoPluxResponse=response;
    console.log(this.pagoPluxResponse);
  })
}

}
