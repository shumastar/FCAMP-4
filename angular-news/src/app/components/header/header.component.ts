import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public isDisabled: boolean;

  @Input() source: string;

  constructor(private apiService: ApiService) { }

  changeChanell(){
    const chanelSelect = <HTMLSelectElement> document.getElementById('chanelSelect');
    this.apiService.chanell.emit(chanelSelect.selectedOptions[0].value);
    this.apiService.source.emit(chanelSelect.selectedOptions[0].text);
  }

  changeOnlyMy(){
    const onlyMy = <HTMLInputElement> document.getElementById('only-my');
    if (onlyMy.checked) {
      this.apiService.chanell.emit('onlyMy');
      this.apiService.source.emit('My news');
    } else {
      this.changeChanell();
    }

  }

  ngOnInit() {
    this.changeChanell();

    this.apiService.source.subscribe((data: string) => {
      this.source = data;
    })
  }

  applyFilter(filter: string): void {
    this.apiService.filter.emit(filter);
  }
}
