import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { AuthService } from '../../services/auth.service';

declare var Paybox: any;
declare var onAuthorize: any;
declare var data: any; // Declarar 'data' como global

@Component({
  selector: 'app-payment',
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

api=inject(AuthService)
userId!:string;

constructor(){
  // (window as any).data = this.api.data;
}
  ngOnInit(): void {
    this.getSession()


  }

  ngAfterViewInit() {
    console.log('cargar scripts')
    //this.loadPayboxScripts();
    this.initializePayboxAuthorize();
  }

  // loadPayboxScripts() {
  //   // Configuración de los datos
  //   (window as any).data  = {
  //     PayboxRemail: "dmorales@pagoplux.com",
  //     PayboxSendmail: "alejozx456@gmail.com",
  //     PayboxRename: "Prueba de pago",
  //     PayboxSendname: "Nombre tarjetahabiente",
  //     PayboxBase0: "0.0",
  //     PayboxBase12: "2.0",
  //     PayboxDescription: "Descripcion del pago",
  //     PayboxLanguage: "es",
  //     PayboxDirection: "Ambato",
  //     PayBoxClientPhone: '0984247778',
  //     PayboxProduction: false,
  //     PayboxRecurrent: false,
  //     PayboxIdPlan: '171',
  //     PayboxPermitirCalendarizar: true,
  //     PayboxPagoInmediato: true,
  //     PayboxCobroPrueba: false,
  //     PayBoxClientIdentification: 'Cedula tarjetahabiente',
  //     PayboxAmountVariablePlan: true,
  //     PayboxFrequencyPlan: 'MEN',
  //     PayboxTieneIvaPlan: true,
  //     PayboxDescriptionPlan: 'Descripcion plan',
  //     PayboxEnvironment: 'sandbox',
  //     PayboxPagoPlux: false,
  //     PayboxIdElement: 'ButtonPaybox'
  //   };


  // }

  getSession(){
    this.api.getSession().subscribe(response=>{

      this.userId=response.user.id;
    })
  }

  initializePayboxAuthorize() {
    (window as any).onAuthorize = (response: any) => {
      if (response.status === 'succeeded') {
        console.log('Pago exitoso:', response);
        const idTransaction = response.detail.id_transaccion;
        const idUser = this.userId;
        this.api.createTransaction(idTransaction,idUser).subscribe(response => {
          console.log(response);
        });
        //detail.id_transaccion
      } else {
        console.log('Pago no exitoso:', response);
      }
    };
  }

  }

















