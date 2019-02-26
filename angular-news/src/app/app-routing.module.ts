import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { HomePageComponent } from './layers/home/home.component';
import { NotFoundPageComponent } from './layers/notFound/notFound.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '404', component: NotFoundPageComponent },
  { path: ':id/edit', component: EditArticleComponent },
  { path: 'add-new-article', component: EditArticleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
