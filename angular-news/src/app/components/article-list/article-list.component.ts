import {
  Component,
  OnInit
} from '@angular/core';
import { mockData } from '../../utils/mockData';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})

export class ArticleListComponent implements OnInit {
  public articles: Array<object> = mockData;

  constructor() {
  }

  ngOnInit() {
  }

  deleteArticle(id: number): void {
    confirm(`Do you really want to delete ${id} article`);
  }

}
