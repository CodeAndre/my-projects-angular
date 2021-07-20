import { Tarefa } from './../shared/tarefa.model';
import { TarefasService } from '../shared/tarefas.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-tarefas',
  templateUrl: './cadastrar-tarefas.component.html',
  styleUrls: ['./cadastrar-tarefas.component.css']
})
export class CadastrarTarefasComponent implements OnInit {

  @ViewChild('formTarefa', { static: true }) formTarefa: NgForm; // ter uma ideia do formulário no nosso componente

  tarefa: Tarefa; //sempre pra salvar em algum lugar 

  constructor(
    private tarefaService: TarefasService,
    private router: Router) { } //por que quando adicionarmos poderemos voltar para a pagina inicial

  ngOnInit(): void {
      this.tarefa = new Tarefa();
  }

  cadastrar(): void {
    if (this.formTarefa.form.valid) { //retorna true ou false
      this.tarefaService.cadastrar(this.tarefa); //executa o tarefaService pelo metodo cadastrar e adiciona na this.tarefa
      this.router.navigate(["/tarefas"]) //retorna para outra tela, aqui vai pra barra tarefas
    }
  }

}
