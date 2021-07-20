import { 
  Directive, ElementRef, Input, OnInit 
} from '@angular/core';

@Directive({
  selector: '[tarefaConcluida]'
})
export class TarefaConcluidaDirective implements OnInit {

  @Input() tarefaConcluida: boolean; //Entrada de dados, do tipo boolean para passar os dados

  constructor(private el: ElementRef) { } //ElementRef --> realizar a referencia do HTML </ td>

  ngOnInit(): void {
    if (this.tarefaConcluida) { //se estiver concluida
      this.el.nativeElement.style.textDecoration = "line-through"; //pego o elemento, chamo o nativeElement(td) e defino um estilo
    }
  }

}
