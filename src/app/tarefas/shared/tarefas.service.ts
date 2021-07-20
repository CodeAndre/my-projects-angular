import { Injectable } from '@angular/core';

import { Tarefa } from './tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor() { }

  listarTodos(): Tarefa[] { //Retorna os dados de tarefas em Obj JSON

    const tarefas = localStorage['tarefas']; //chave que representa as tarefas

    return tarefas ? JSON.parse(tarefas) : []; //retorna o Array de tarefas, ou nenum Array
  }

  cadastrar(tarefa: Tarefa): void { //retorna void pois é só cadastro
    const tarefas = this.listarTodos(); //Obtem todas as tarefas para cadastrar
    tarefa.id = new Date().getTime(); // gerar o id da tarefa cadastrada
    tarefas.push(tarefa); // adiciona no array tarefas
    localStorage['tarefas'] = JSON.stringify(tarefas) //adiciona a nova tarefa junto com todas as tarefas no localStorage
  }

  buscarPoiId(id: number): Tarefa { //bucar o id e retorna a tarefa
    const tarefas: Tarefa[] = this.listarTodos(); //obter todas as tarefas
    return tarefas.find(tarefa => tarefa.id === id) // .find --> para cada tarefa ele valida se o id é igual ao tarefa.id, só pega o valor
  }

  atualizar(tarefa: Tarefa): void { //atualizar tarefa
    const tarefas: Tarefa[] = this.listarTodos(); //obter todas as tarefas
    tarefas.forEach((objTarefa, position, listaTarefa) => { //para cada tarefa olhar tais parametos (tarefaAtual, posição e Arraytarefas)
      if (tarefa.id === objTarefa.id) {
        listaTarefa[position] = tarefa; // a posição da tarefa mais a tarefa em si, se for validado irá retorna a tarefa atualizada em si
      }
    });
    localStorage['tarefas'] = JSON.stringify(tarefas); //atualizo a lista
  }

  remover(id: number): void {
    let tarefas: Tarefa[] = this.listarTodos();
    tarefas = tarefas.filter(tarefa => tarefa.id !== id); // Ele vai em todas tarefas e irá ver se a tarefa.id em pesquisa é diferente do id em pesquisa, se sim, segue, se não, ela é excluída, array false não será passado
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }

  alterarStatus(id: number): void {
    const tarefas: Tarefa[] = this.listarTodos();
    tarefas.forEach((objTarefa, position, listaTarefa) => {
      if(id === objTarefa.id) {
        listaTarefa[position].concluida = !objTarefa.concluida //Atualizar se está concluida ou não
      }
    });
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }
}
