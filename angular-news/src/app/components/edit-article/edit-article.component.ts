import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  saveArticle(): void {
    alert('The article was successfully saved');
  }

}
