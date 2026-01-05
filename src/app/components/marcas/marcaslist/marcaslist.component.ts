import { TemplateRef, ViewChild, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Marca } from '../../../models/marca';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MarcasdetailsComponent } from '../marcasdetails/marcasdetails.component';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [HttpClientModule, MdbModalModule, MarcasdetailsComponent],
  templateUrl: './marcaslist.component.html',
  styleUrls: ['./marcaslist.component.scss']
})
export class MarcaslistComponent {
  lista: Marca[] = [];
  marcaEdit: Marca = new Marca("");

  @Input("esconderBotoes") esconderBotoes: boolean = false;  
  @Output("retorno") retorno = new EventEmitter<any>();

  //ELEMENTOS DA JANELA MODAL
  modalService = inject(MdbModalService);
  @ViewChild("modalMarcaDetalhe") modalMarcaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  marcaService = inject(MarcaService);


  constructor(){
    this.listAll();

    let marcaNovo = history.state.marcaNovo;
    let marcaEditado = history.state.marcaEditado;

    if(marcaNovo != null){
        marcaNovo.id = 555;
        this.lista.push(marcaNovo);
    }
    
    
    if(marcaEditado !=null){
      let indice = this.lista.findIndex(x => {return x.id == marcaEditado.id});
      this.lista[indice] = marcaEditado;
    }
  }
  
  listAll(){
    this.marcaService.listAll().subscribe({
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


  deleteById(marca: Marca){
  Swal.fire({
    title: 'Tem certeza que deseja deletar este registro?',
    icon: 'warning',
    showConfirmButton: true,
    showDenyButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não',
  }).then((result) => {
    if (result.isConfirmed && marca.id !== undefined) {
      this.marcaService.delete(marca.id).subscribe({
        next: mensagem => {
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
  

  novo(){
    this.marcaEdit = new Marca("");
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  edit(marca: Marca){
    //Essa linha de código evita referência de objeto, através de clonagem.
    //Ou seja, impede que um texto numa grid seja alterado
    //se o usuário sair sem confirmar a edição. 
    this.marcaEdit = Object.assign({}, marca); 
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }


  retornoDetalhe(marca: Marca){
    this.listAll();      
    this.modalRef.close();

  }
  
  select(marca: Marca){
    this.retorno.emit(marca);
  }

}  




