import { Injectable } from '@angular/core';

import { Moeda } from '../models/moeda.model';

@Injectable({
  providedIn: 'root'
})

export class MoedaService {

  private moedas: Moeda[];

  constructor() { }

  private moedasObj = [ //http://fixer.io
    { "sigla": "AUD", "descricao": "Dólar australiano" },
    { "sigla": "BGN", "descricao": "Lev búlgaro" },
    { "sigla": "BRL", "descricao": "Real brasileiro" },
    { "sigla": "CAD", "descricao": "Dólar canadense" },
    { "sigla": "CHF", "descricao": "Franco suíço" },
    { "sigla": "CNY", "descricao": "Yuan Chinês" },
    { "sigla": "CZK", "descricao": "Coroa República Tcheca" },
    { "sigla": "DKK", "descricao": "Coroa dinamarquesa" },
    { "sigla": "EUR", "descricao": "Euro" },
    { "sigla": "GBP", "descricao": "Libra Esterlina" },
    { "sigla": "HKD", "descricao": "Dólar de Hong Kong" },
    { "sigla": "HRK", "descricao": "Coroa Croácia" },
    { "sigla": "HUF", "descricao": "Florim húngaro" },
    { "sigla": "IDR", "descricao": "Rupia indonésia" },
    { "sigla": "ILS", "descricao": "Novo shekel israelense" },
    { "sigla": "INR", "descricao": "Rupia indiana" },
    { "sigla": "JPY", "descricao": "Iene japonês" },
    { "sigla": "KRW", "descricao": "Won sul-coreano" },
    { "sigla": "MXN", "descricao": "Peso mexicano" },
    { "sigla": "MYR", "descricao": "Malásia Ringgit" },
    { "sigla": "NOK", "descricao": "Coroa Noruega" },
    { "sigla": "NZD", "descricao": "Dólar da Nova Zelândia" },
    { "sigla": "PHP", "descricao": "Peso filipino" },
    { "sigla": "PLN", "descricao": "Złoty Polónia" },
    { "sigla": "RON", "descricao": "Leu romeno" },
    { "sigla": "RUB", "descricao": "Belarus Ruble" },
    { "sigla": "SEK", "descricao": "Coroa Suécia" },
    { "sigla": "SGD", "descricao": "Dólar de Singapura" },
    { "sigla": "THB", "descricao": "Baht Tailândia" },
    { "sigla": "TRY", "descricao": "Lira turca" },
    { "sigla": "USD", "descricao": "Dólar dos Estados Unidos" }, 
    { "sigla": "ZAR", "descricao": "Rand África do Sul" }
  ];

  listarTodos(): Moeda[] { // listar todas as moedas, por isso pegar o array Moedas[]

    if (this.moedas) { //se a moeda já existir . retorna moeda
      return this.moedas
    }

    this.moedas = []; // array vazio para a criação da Moeda

    for(let moedaObj of this.moedasObj) { // para cada moeda pegue a classe moedasObj (onde fica a listagem das moedas)
      let moeda: Moeda = new Moeda(); // atualizamos a constante para moeda de : Moeda = new Moeda()
      Object.assign(moeda, moedaObj);
      this.moedas.push(moeda); // adiciona no ultimo array
    }

    return this.moedas //retorna a moedas
  }

}
