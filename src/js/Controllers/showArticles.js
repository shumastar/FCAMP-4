import { newsList } from '../Utils/const';
import { articleTemplate } from '../Components/Article';

function showArticles(data) {
  newsList.innerHTML = "";
  const articles = data.articles
  articles.forEach(createArticle);
}

function createArticle(article) {
  newsList.innerHTML += articleTemplate(article);
}

export default showArticles;
