import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JogoDaVelhaService {


  constructor() { }

  private readonly TAB_TAM: number = 3; //Aqui nada será modificado
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly VAZIO: number = 0;

  private tabuleiro: any;   // Atributos de controle do jogo
  private numeroMov: number;
  private vitoria: any;

  private _jogador: number;  //atributos para mostrar o jogo na view
  private _mostrarInicio: boolean;
  private _mostrarTabuleiro: boolean;
  private _mostrarFim: boolean;


  inicializar(): void {
    this._mostrarInicio = true;
    this._mostrarTabuleiro = false;
    this._mostrarFim = false;
    this.numeroMov = 0;
    this._jogador = this.X;
    this.vitoria = false ;
    this.inicializarTabuleiro();
  }

  inicializarTabuleiro() : void {
    this.tabuleiro = [this.TAB_TAM];
    for (let i = 0; i< this.TAB_TAM; i++) { //para cada linha, ponha vazio
      this.tabuleiro[i] = [this.VAZIO, this.VAZIO, this.VAZIO] //cada linha (9) vai ter vazio
    }
  }

  //Tela de inicio ser exebida
  get mostrarInicio(): boolean {
    return this._mostrarInicio
  }

  //Tabuleiro deve ser exibido

  get mostrarTabuleiro(): boolean {
    return this._mostrarTabuleiro
  }

  // Retornar se a tela de fim de jogo deve ser exibida

  get mostrarFim(): boolean {
    return this._mostrarFim
  }

  //Retornar o número do jogador a jogar

  get jogador(): number {
    return this._jogador
  }

  //Exibir o tabuleiro 

  iniciarJogo(): void { //quando cliar o botão vai executar tais funções
    this._mostrarInicio = false;
    this._mostrarTabuleiro = true;
  }

  // Realizar a organização das jogadas no tabuleiro

  jogar(posX: number, posY: number): void {
    //jogada invalida
    if (this.tabuleiro[posX] [posY] !== this.VAZIO || this.vitoria ) { // Se for difrente de vazio que dizer que já algum elemento lá, ou, se houver alguma vitoria
      return
    }

    this.tabuleiro[posX] [posY] = this._jogador; //setar a pos x e y que contém vazio
    this.numeroMov++; //incrementa o numero de movimentos
    this.vitoria = this.fimJogo(posX, posY, //verificação se o jogo acabou
      this.tabuleiro, this._jogador);
    this._jogador = (this._jogador === this.X) ? this.O : this.X; //lógica d sequencia de jogadas

    if(!this.vitoria && this.numeroMov < 9) { // lógica para o computador jogar
      this.cpuJogar();
    }

    // Se houve vitoria 

    if (this.vitoria !== false) {
      this._mostrarFim = true;
    }

    //Se houver empates

    if (!this.vitoria && this.numeroMov === 9) {
      this._jogador = 0;
      this._mostrarFim = true;
    }
  }

  fimJogo(linha: number, coluna: number, tabuleiro: any, jogador: number) {
    let fim: any = false;

    // valida a linha
    if (tabuleiro[linha][0] === jogador && 
      tabuleiro[linha][1] === jogador && 
      tabuleiro[linha][2] === jogador) {
      fim = [[linha, 0], [linha, 1], [linha, 2]];
    }

    // valida a coluna
    if (tabuleiro[0][coluna] === jogador && 
      tabuleiro[1][coluna] === jogador && 
      tabuleiro[2][coluna] === jogador) {
      fim = [[0, coluna], [1, coluna], [2, coluna]];
    }

    // valida as diagonais
    if (tabuleiro[0][0] === jogador && 
      tabuleiro[1][1] === jogador && 
      tabuleiro[2][2] === jogador) {
      fim = [[0, 0], [1, 1], [2, 2]];
    }

    if (tabuleiro[0][2] === jogador && 
      tabuleiro[1][1] === jogador && 
      tabuleiro[2][0] === jogador) {
      fim = [[0, 2], [1, 1], [2, 0]];
    }

    return fim;
  }

    //Lógica do computador
  cpuJogar(): void {
    // verifica jogada de vitória
    let jogada: number[] = this.obterJogada(this.O);

    if (jogada.length <= 0) {
      // tenta jogar para evitar derrota
      jogada = this.obterJogada(this.X);
    }

    if (jogada.length <= 0) {
      // joga aleatório
      let jogadas: any = [];
      for (let i=0; i<this.TAB_TAM; i++) {
        for (let j=0; j<this.TAB_TAM; j++) {
          if (this.tabuleiro[i][j] === this.VAZIO) {
            jogadas.push([i, j]);
          }
        }
      }
      let k = Math.floor((Math.random() * (jogadas.length - 1)));
      jogada = [jogadas[k][0], jogadas[k][1]];
    }

    this.tabuleiro[jogada[0]][jogada[1]] = this._jogador;
    this.numeroMov++;
    this.vitoria = this.fimJogo(jogada[0], jogada[1],
        this.tabuleiro, this._jogador);
    this._jogador = (this._jogador === this.X) ? this.O : this.X;
  }

    //Obtém uma jogada válida para vitória

  obterJogada(jogador: number): number[] {
    let tab = this.tabuleiro;
    for (let lin = 0; lin < this.TAB_TAM; lin++) {
      for (let col = 0; col < this.TAB_TAM; col++) {
        if (tab[lin][col] !== this.VAZIO) {
          continue;
        }
        tab[lin][col] = jogador;
        if (this.fimJogo(lin, col, tab, jogador)) {
          return [lin, col];
        }
        tab[lin][col] = this.VAZIO;
      }
    }
    return [];
  }

  exibirX(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.X;
  }

  exibirO(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.O;
  }

  exibirVitoria(posX: number, posY: number): boolean {
    let exibirVitoria: boolean = false;

    if (!this.vitoria) {
      return exibirVitoria;
    }

    for (let pos of this.vitoria) {
      if (pos[0] === posX && pos[1] === posY) {
        exibirVitoria = true;
        break;
      }
    }

    return exibirVitoria;
  }


    //Iniciar um jogo, assim que exibir um tabuleiro
  novoJogo(): void {
    this.inicializar();
    this._mostrarFim = false;
    this._mostrarInicio = false;
    this._mostrarTabuleiro = true;
  }

}
