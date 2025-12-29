import { TemplateRef, ViewChild, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Marca } from '../../../models/marca';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { MarcaService } from '../../../services/marca.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MarcaslistComponent } from '../../marcas/marcaslist/marcaslist.component';

@Component({
  selector: 'app-marcasdetails',
  imports: [MdbFormsModule, FormsModule, MarcaslistComponent],
  templateUrl: './marcasdetails.component.html',
  styleUrl: './marcasdetails.component.scss'
})
export class MarcasdetailsComponent {

  @Input("marca") marca: Marca = new Marca(0,"");
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  //ELEMENTOS DA JANELA MODAL
  modalService = inject(MdbModalService);
  @ViewChild("modalMarcas") modalMarcas!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  marcaService = inject(MarcaService);
formulario: any;

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }    

  findById(id: number){
      this.marcaService.findById(id).subscribe({
        next: retorno => {
          this.marca = retorno;

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
    if (this.marca.id > 0){
      
      this.marcaService.update(this.marca, this.marca.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/marcas'], {state: {marcaEditado: this.marca}});
          this.retorno.emit(this.marca);
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
      

      this.marcaService.save(this.marca).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/marcas'], {state: {marcaNovo: this.marca}});
          this.retorno.emit(this.marca);
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

  buscarMarca(){

  }


  retornoMarca(marca: Marca){

  }




}