import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchForProductByTitle',
  standalone: true
})
export class SearchForProductByTitlePipe implements PipeTransform {

  transform(arrayOfObject:any[] , sentence:string): any[] {
    if (''==sentence) {
      return arrayOfObject;
    }
    return arrayOfObject.filter( (item)=> item.title.toLowerCase().includes(sentence.toLowerCase()) );
  }

}
