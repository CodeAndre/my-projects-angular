import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'; //
import { Observable } from 'rxjs/Observable'; // já importado
import { Conversao } from '../models/conversao.model';
import { ConversaoResponse } from '../models/conversao-response.model';


@Injectable()
export class ConversorService {
  // Nova url do fixer.io, que adiciona o parâmetro access_key, que é a chave de autenticação 
  private readonly BASE_URL = "http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3";
  constructor(private http: HttpClient) {} //chmar HTTPCliente em this.http


  //Realiza a chamada em API
  converter(conversao: Conversao): Observable<any> { //<any> contém o retorno da requisição extena

  let params = `&base=${conversao.moedaDe}&symbols=${conversao.moedaPara}`;
    return this.http
    .get(this.BASE_URL + params);  
  }
 

  cotacaoPara(conversaoResponse: ConversaoResponse, 
 conversao: Conversao): number {
  if (conversaoResponse === undefined) { //se n haver nada em ConversaoResponse retorna 0
  return 0;
  }
  return conversaoResponse.rates[conversao.moedaPara]; //retorna a conversão para a moeda em pesquisa
  }

  cotacaoDe(conversaoResponse: ConversaoResponse, 
 conversao: Conversao): string {
  if (conversaoResponse === undefined) {
  return '0';
  }
  return (1 / conversaoResponse.rates[conversao.moedaPara]) //sempre retorna em base 1
  .toFixed(4);// limitar o numero de casa decimais
  }
 
  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if (conversaoResponse === undefined) {
      return '';
    }
    return conversaoResponse.date;
  }
}
