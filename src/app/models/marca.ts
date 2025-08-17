export class Marca {
  constructor(
    public id: number,
    public nome: string,
    public descricao?: string   
    /*Quando você coloca descricao?: string, está dizendo que a propriedade é opcional — ou seja, o objeto pode ter ou não esse campo.
      Se for no construtor, o ? indica que não é obrigatório passar um valor ao instanciar.
      Então na tela de cadastro você pode não preencher o campo descricao e ainda assim o objeto será válido.*/
  ) {}
}
