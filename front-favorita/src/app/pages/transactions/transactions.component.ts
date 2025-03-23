import { Component, inject, ViewChild } from '@angular/core';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ResponseTransaction, Transaction } from '../../models/transaction-response.interface';
import { DetailPaymentComponent } from '../../components/detail-payment/detail-payment.component';
@Component({
  selector: 'app-transactions',
  imports: [ToolbarComponent,CommonModule,MatIconModule,MatButtonModule,
    MatTableModule,MatFormFieldModule,MatInputModule,MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {

api=inject(AuthService);
dialog=inject(MatDialog);
displayedColumns: string[] = ['Transaccion','detalle'];
dataSource!:MatTableDataSource<Transaction>;
transactions!:ResponseTransaction;
userId!:string

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

ngOnInit(){


}

ngAfterViewInit() {
  this.getTransactions();

}

getTransactions() {
  this.api.getSession().subscribe(response => {
    this.userId = response.user.id;
    console.log('ID del usuario:', this.userId);


    this.api.getTransactions(this.userId).subscribe((response: ResponseTransaction) => {

      this.transactions=response;
      this.dataSource = new MatTableDataSource<Transaction>(response.transactions);
      console.log(this.transactions)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  });
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

openDialogDetailPayment(id:string) {
const dialogRef=this.dialog.open(DetailPaymentComponent,{
  width:'400px',
  height:'600px',
  data:id
})
}


}
