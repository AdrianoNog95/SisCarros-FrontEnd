import { Acessorio } from "./acessorio";
import { Marca } from "./marca";

export class Carro {
  public id: number;
  public nome: string;
  public marca?: Marca;
  public acessorios: Acessorio[];

  constructor(id: number, nome: string, marca?: Marca, acessorios: Acessorio[] = []) {
    this.id = id;
    this.nome = nome;
    if (marca) {
      this.marca = marca;
    }
    this.acessorios = acessorios;
  }
}
