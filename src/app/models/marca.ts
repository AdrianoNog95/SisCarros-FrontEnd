export class Marca {
  public id?: number;
  public nome: string;

  constructor(nome: string, id?: number) {
    this.nome = nome;
    if (id !== undefined) {
      this.id = id;
    }
  }
}
