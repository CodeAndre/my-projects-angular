
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ConversorService } from '../services/conversor.service';
import { ConversaoResponse } from '../models/conversao-response.model';
import { Conversao } from '../models/conversao.model';

@Component({
  selector: 'modal-cotacao',
  templateUrl: './modal-cotacao.component.html',
  styleUrls: ['./modal-cotacao.component.css']
})
export class ModalCotacaoComponent implements OnInit {

  @Input() id: string; //Comunicação entre componentes, conversao --> cotacao
  @Input() conversaoResponse: ConversaoResponse; //@Input--> recebe parametros de outros componentes
  @Input() conversao: Conversao = new Conversao();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>(); // ele emiti uma notificação ao componente pai para ele realizar alguma ação

  constructor(private conversorService: ConversorService) { } //service no componente

  ngOnInit(): void {
  }

  novaConsulta() {
    this.onConfirm.emit(); // vai emitir para o componente pai que ele realize a ação Init()
  }

  get valorConvertido(): string {
    if (this.conversaoResponse === undefined) {
      return '0';
    }
    
    return (this.conversao.valor *  //o valor que entrei com o formulário
      this.conversaoResponse.rates[this.conversao.moedaPara]).toFixed(2); //retorna quanto que vale 1 EUR em Reais e multiplica pelo valor que eu coloquei no formulário
  }

  get cotacaoPara(): number {
    return this.conversorService.cotacaoPara(
      this.conversaoResponse, this.conversao);
  }

  get cotacaoDe(): string {
    return this.conversorService.cotacaoDe(
      this.conversaoResponse, this.conversao);
  }

  get dataCotacao(): string {
    return this.conversorService.dataCotacao(
      this.conversaoResponse);
  }

}
