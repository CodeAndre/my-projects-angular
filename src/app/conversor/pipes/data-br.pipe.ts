import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataBr'
})
export class DataBrPipe implements PipeTransform {

  transform(dataEn: string): string {
    if(!dataEn) {
      return ''
    }

    const dataArray = dataEn.split('-'); //separar ano(0) - mes(1) - dia (2)
    if(dataArray.length !== 3) {
      return dataEn;
    }

    return dataArray[2] + '/' + dataArray[1] + '/' + dataArray[0]; // dia/mes/ano
  }

}
