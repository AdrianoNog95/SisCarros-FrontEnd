import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from '../carrosdetails/carrosdetails.component';
import { CarroService } from '../../../services/carro.service';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [HttpClientModule, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrls: ['./carroslist.component.scss']
})
export class CarroslistComponent {
  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0,"", null);
  

  //ELEMENTOS DA JANELA MODAL
  modalService = inject(MdbModalService);
  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroService = inject(CarroService);


  constructor(){
    this.listAll();

    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if(carroNovo != null){
        carroNovo.id = 555;
        this.lista.push(carroNovo);
    }
    
    
    if(carroEditado !=null){
      let indice = this.lista.findIndex(x => {return x.id == carroEditado.id});
      this.lista[indice] = carroEditado;
    }
  }
  
  listAll(){
    this.carroService.listAll().subscribe({
      next: lista => {//quando o back retornar o que se espera
        this.lista = lista;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }        


  deleteById(carro: Carro){
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {

        this.carroService.delete(carro.id).subscribe({
          next: mensagem => {//quando o back retornar o que se espera
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok',
          });
          this.listAll();

        },
        error: erro => {
          Swal.fire({
              title: 'Ocorreu um erro',
              icon: 'error',
              confirmButtonText: 'Ok'
          });    

       }
      });

        
      }
    });
  }

  new(){
    this.carroEdit = new Carro(0,"", null);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro){
    //Essa linha de código evita referência de objeto, através de clonagem.
    //Ou seja, impede que um texto numa grid seja alterado
    //se o usuário sair sem confirmar a edição. 
    this.carroEdit = Object.assign({}, carro); 
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }


  retornoDetalhe(carro: Carro){
    this.listAll();      
    this.modalRef.close();
  } 

}    
