import { Marca } from "./marca";

export class Carro {
  constructor(
    public id: number,
    public nome: string,
    public marca: Marca | null
  ) {}
}
