import {
  Component,
  OnInit
} from '@angular/core';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})

export class ArticleListComponent implements OnInit {
  public articles: Array<object>;
  public page: number = 1;
  public chanell: string;
  public isAction: boolean;
  public filter: string;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.onGet();
    this.apiService.filter.subscribe((data: string) => {
      this.filter = data;
    })
  }

  onGet() {
    this.apiService.chanell.subscribe((chanell: string) => {
      this.chanell = chanell;
      this.page = 1;
      (this.chanell === 'onlyMy')
        ? this.isAction = true
        : this.isAction = false;
      this.apiService.getArticles(chanell, this.page).subscribe(
        (articles: any) => {
          this.articles = articles;
          this.page++;
        },
        (error) => console.log(error)
      )
    })
    if (this.chanell && this.page > 1) {
      this.apiService.getArticles(this.chanell, this.page).subscribe(
        (articles: any) => {
          const newArt = [...this.articles, ...articles];
          this.articles = newArt;
          this.page++;
        },
        (error) => console.log(error)
      )
    }
  }

  loadMore(): void {
    this.onGet();
  }

  deleteAction(id: number): void {
    this.apiService.deleteArticle(id).subscribe(
      (response) => {
        this.articles = [];
        this.onGet();
      },
      (error) => console.log(error)
    );
  }
}
