import { TemplateRef, ViewChild, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AcessoriosdetailsComponent } from '../acessoriosdetails/acessoriosdetails.component';
import { AcessorioService } from '../../../services/acessorio.service';

@Component({
  selector: 'app-acessorioslist',
  standalone: true,
  imports: [HttpClientModule, MdbModalModule, AcessoriosdetailsComponent],
  templateUrl: './acessorioslist.component.html',
  styleUrls: ['./acessorioslist.component.scss']
})
export class AcessorioslistComponent {

  lista: Acessorio[] = [];
  acessorioEdit: Acessorio = new Acessorio("");

  @Input("esconderBotoes") esconderBotoes: boolean = false;  
  @Output("retorno") retorno = new EventEmitter<Acessorio>();

  modalService = inject(MdbModalService);
  @ViewChild("modalAcessorioDetalhe") modalAcessorioDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  acessorioService = inject(AcessorioService);

  constructor() {
    this.listAll();

    const acessorioNovo = history.state.acessorioNovo;
    const acessorioEditado = history.state.acessorioEditado;

    if (acessorioNovo != null) {
      acessorioNovo.id = 555;
      this.lista.push(acessorioNovo);
    }

    if (acessorioEditado != null) {
      const indice = this.lista.findIndex(x => x.id === acessorioEditado.id);
      if (indice >= 0) {
        this.lista[indice] = acessorioEditado;
      }
    }
  }

  listAll() {
    this.acessorioService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: () => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  deleteById(acessorio: Acessorio) {
  if (acessorio.id == null) {
    return;
  }

  const id: number = acessorio.id;

  Swal.fire({
    title: 'Tem certeza que deseja deletar este registro?',
    icon: 'warning',
    showConfirmButton: true,
    showDenyButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não',
  }).then((result) => {
    if (result.isConfirmed) {
      this.acessorioService.delete(id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.listAll();
        },
        error: () => {
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

  abrirNovo() {
    this.acessorioEdit = new Acessorio("");
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  edit(acessorio: Acessorio) {
    this.acessorioEdit = Object.assign({}, acessorio);
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  retornoDetalhe(acessorio: Acessorio) {
    this.listAll();
    this.modalRef.close();
  }

  select(acessorio: Acessorio) {
    this.retorno.emit(acessorio);
  }
}
