import { TemplateRef, ViewChild, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Acessorio } from '../../../models/acessorio';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AcessorioService } from '../../../services/acessorio.service';


@Component({
  selector: 'app-acessoriosdetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './acessoriosdetails.component.html',
  styleUrl: './acessoriosdetails.component.scss'
})
export class AcessoriosdetailsComponent {

  @Input("acessorio") acessorio: Acessorio = new Acessorio('');
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  
  acessorioService = inject(AcessorioService);
formulario: any;

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }    

  findById(id: number){
      this.acessorioService.findById(id).subscribe({
        next: retorno => {
          this.acessorio = retorno;

        },
        error: erro => {
          Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
     }
    });
  }    
      
  
  save() {
    if (this.acessorio.id !== undefined){
      
      this.acessorioService.update(this.acessorio, this.acessorio.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/acessorios'], {state: {acessorioEditado: this.acessorio}});
          this.retorno.emit(this.acessorio);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
        });       
      }
    });      
      
         
    }else{
      

      this.acessorioService.save(this.acessorio).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/acessorios'], {state: {acessorioNovo: this.acessorio}});
          this.retorno.emit(this.acessorio);
        },
        error: erro => {
           Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });       
        }
      });         
       
    }

    

  }

  buscarAcessorio(){

  }


  retornoAcessorio(acessorio: Acessorio){

  }




}