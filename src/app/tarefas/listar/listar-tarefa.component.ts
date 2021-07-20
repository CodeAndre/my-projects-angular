import { TarefasService } from './../shared/tarefas.service';
import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../shared/tarefa.model';


@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.component.html',
  styleUrls: ['./listar-tarefa.component.css']
})
export class ListarTarefaComponent implements OnInit {

  tarefas: Tarefa[];

  constructor(private tarefasService: TarefasService) { } //Chamei os serviços do Tarefa Service

  ngOnInit(): void {
    this.tarefas = this.listarTodos(); //ao iniciar vai me da uma lista vazia
  }

  listarTodos(): Tarefa[] {
    return this.tarefasService.listarTodos();
  }

  remover($event: any, tarefa: Tarefa): void { // adicionamos o $event para recuperar funções do JS
    $event.preventDefault(); // evitar o carregamento da página
    if (confirm(`Deseja remover a tarefa: "${tarefa.nome}" ?`)) {
      this.tarefasService.remover(tarefa.id); //chama o serviço de remover
      this.tarefas = this.listarTodos(); //atualizar a tabela 
    }
  }

  alterarStatus(tarefa: Tarefa): void {
    if(confirm(`Deseja altera os status da tarefa: "${tarefa.nome}" ?`)) {
      this.tarefasService.alterarStatus(tarefa.id); //pega o serviço alterarStatus
      this.tarefas = this.listarTodos(); //atualizar
    }
  }
}
