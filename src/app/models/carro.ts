import { Acessorio } from "./acessorio";
import { Marca } from "./marca";

export class Carro {
  public id?: number;
  public nome!: string;
  public marca?: Marca;
  public acessorios: Acessorio[] = [];

  constructor(
    nome?: string,
    marca?: Marca,
    acessorios: Acessorio[] = [],
    id?: number
  ) {
    if (nome) this.nome = nome;
    if (marca) this.marca = marca;
    this.acessorios = acessorios;

    if (id !== undefined) {
      this.id = id;
    }
  }
}
