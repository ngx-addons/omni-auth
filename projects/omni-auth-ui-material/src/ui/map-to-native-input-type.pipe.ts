import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'mapToNativeType', standalone: true})
export class MapToNativeInputTypePipe implements PipeTransform {
  transform(value: string): 'text' | 'email' | 'password' | 'tel' | 'url' {
    switch (value) {
      case 'email':
        return 'email';
      case 'password':
        return 'password';
      case 'tel':
      case 'phone':
        return 'tel';
      case 'url':
      case 'link':
        return 'url';
      default:
        return 'text';
    }
  }
}
