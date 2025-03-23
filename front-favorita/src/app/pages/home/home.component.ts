import { Component } from '@angular/core';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { PaymentComponent } from "../../components/payment/payment.component";

@Component({
  selector: 'app-home',
  imports: [PaymentComponent, ToolbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
