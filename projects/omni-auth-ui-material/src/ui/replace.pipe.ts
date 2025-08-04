import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'replace', standalone: true})
export class ReplacePipe implements PipeTransform {
  transform(value: string, strToReplace: string, replacementStr: string): string {
    if (!value || !strToReplace || !replacementStr) {
      return value;
    }

    return value.replace(new RegExp(strToReplace, 'g'), replacementStr);
  }
}
