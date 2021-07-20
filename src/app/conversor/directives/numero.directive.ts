import { Directive, HostListener, ElementRef   } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Directive({
  selector: '[numero]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumeroDirective,
    multi: true
  }]
})
export class NumeroDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;

  constructor(private el: ElementRef) { }

  @HostListener('keyup', ['$event']) //escutar o evento quando a tecla é pressionada 

  onKeyUp($event: any) {

    let valor = $event.target.value; // o valor assim que a tecla é acionada
    let posiDeci = valor.indexOf('.');

    valor = valor.replace(/[\D]/g, ''); //tudo que não é numero será removido

    if(posiDeci > 0 ) {
      valor = valor.substr(0, posiDeci) + '.' + valor.substr(posiDeci); //valor 0 da posiDeci + . + o valor em si, que seria os centavos
    }

    $event.target.value = valor; //o valor já atulizado sem letras
    this.onChange(valor); // essa funçao atualiza o model, com o input corretamente sem letras
  }

  //Registra função a ser chamada para atualizar o valor no model
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

    //Obtem o exato valor contido no model
  writeValue(value: any) {
    this.el.nativeElement.value = value;
  }
}
