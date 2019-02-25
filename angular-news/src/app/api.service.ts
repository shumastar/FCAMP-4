import {
  Injectable,
  EventEmitter
} from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public apiKey: string = '85e168742c28431db328204ff1cfb6e8';
  public baseUrl: string = 'https://newsapi.org/v2/top-headlines';
  public onlyMyUrl: string = 'http://localhost:3000/news';
  public chanell: EventEmitter<string> = new EventEmitter();
  public source: EventEmitter<string> = new EventEmitter();
  public filter: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

  }

  getArticles(chanell, page) {
    if (chanell === 'onlyMy') {
      return this.http.get<any>(this.onlyMyUrl)
        .pipe(map((response: any) => response.news));
    } else { return this.http.get<any>(`${this.baseUrl}?country=${chanell}&apiKey=${this.apiKey}&page=${page}&pageSize=5`)
        .pipe(map((response: any) => response.articles));
    }
  }

  getArticle(id) {
    return this.http.get<any>(`${this.onlyMyUrl}/${id}`)
      .pipe(map((response: any) => response.news));
  }

  addArticle(article: any) {
    return this.http.post(`${this.onlyMyUrl}/`, article);
  }

  updateArticle(id: any, article: any) {
    return this.http.put(`${this.onlyMyUrl}/${id}`, article);
  }

  deleteArticle(id: any) {
    return this.http.delete(`${this.onlyMyUrl}/${id}`);
  }
}
