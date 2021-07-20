
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MoedaService } from './../services/moeda.service';
import { ConversorService } from '../services/conversor.service';
import { Conversao } from '../models/conversao.model';
import { ConversaoResponse } from '../models/conversao-response.model';
import { Moeda } from '../models/moeda.model';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

  moedas: Moeda[];
  conversao: Conversao;
  possuiErro: boolean;
  conversaoResponse: ConversaoResponse; 

  @ViewChild("conversaoForm", { static: true }) conversaoForm: NgForm; //ligação do form com a atribuição de classe

  constructor(
    private moedaService: MoedaService,
    private conversorService: ConversorService
  ) { }

  ngOnInit(): void {
    this.moedas = this.moedaService.listarTodos();
    this.init();
  }

  init() { //incializa o nosso código
    this.conversao = new Conversao('EUR', 'BRL', null);  //chama conversao, new Conversao 
    this.possuiErro = false;
  }

  converter() {
    if (this.conversaoForm.form.valid) {
      this.conversorService
      .converter(this.conversao)
      .subscribe(response => this.conversaoResponse = response,
        error => this.possuiErro = true
        );
    }
  }
}
